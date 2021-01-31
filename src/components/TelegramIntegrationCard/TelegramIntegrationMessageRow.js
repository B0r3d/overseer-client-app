import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Badge, Pagination, PaginationLink, PaginationItem } from 'reactstrap';
import { REQUEST } from '../../request.constants';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';

const formatDate = dateString => {
  const date = new Date(dateString);

  let month = '' + (date.getMonth() + 1),
  day = '' + date.getDate(),
  year = '' + date.getFullYear(),
  hour = '' + date.getHours(),
  minutes = '' + date.getMinutes();
        
  if(month.length < 2) 
    month = '0' + month;
  if(day.length < 2) 
    day = '0' + day;
  if(hour.length < 2)
    hour = '0' + hour;
  if(minutes.length < 2)
    minutes = '0' + minutes;

  return `${day}.${month}.${year}, ${hour}:${minutes}`;
}

export const TelegramIntegrationMessagesRow = ({ integration, location, project }) => {
  const [messages, setMessages] = useState({
    page: 1,
    count: 0,
    items: [],
  });
  const [status, setStatus] = useState(REQUEST.PENDING);
  const urlParams = new URLSearchParams(location.search);
  const [activeMessagesIndex, setActiveMessageIndex] = useState(-1);

  const requestMessages = (page) => {
    IntegrationApi.getTelegramIntegrationMessages(integration.id, page)
    .then(response => response.data)
    .then(json => {
      setMessages({
        page: json.payload.page,
        count: json.payload.count,
        items: json.payload.items,
      });
      setStatus(REQUEST.SUCCESS);
      setActiveMessageIndex(-1);
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    });
  }
  useEffect(() => {
    console.log(urlParams.get("page"));
    requestMessages(urlParams.get("page") || 1)
  }, [urlParams.get("page")]);

  console.log(messages);
  return(
    <>
      <div className="mb-4">
        <h3>Messages</h3>
        <hr className="solid"/>
      </div>
      {status === REQUEST.PENDING && <p>Loading...</p> }
      {status === REQUEST.ERROR && <p>Failed to load messages</p> }
      {status === REQUEST.SUCCESS && 
        <>
          {messages.count === 0 ? <p>There are no messages to display</p> : messages.items.map((message, index) =>
            <div className="mb-2">
              <p style={{cursor: "pointer"}} onClick={() => activeMessagesIndex === index ? setActiveMessageIndex(-1) : setActiveMessageIndex(index)}><strong>{`#${index + 1 + (messages.page - 1) * 10} ${message.id}`}</strong></p>
              {activeMessagesIndex === index && 
                <>
                  <p>Status: <Badge color={message.status === "error" ? "danger" : message.status === "unprocessed" ? "secondary" : "success"}>{message.status}</Badge> </p>
                  <p>Last delivery attempt: <strong>{message.last_attempt ? formatDate(message.last_attempt) : '-'}</strong></p>
                  <p>Next delivery attempt: <strong>{message.next_attempt ? formatDate(message.next_attempt) : '-'}</strong></p>
                  <p>Delivery attempts: <strong>{message.attempt_count}</strong></p>
                  <div>
                    <p className="mb-1">Message</p>
                    <pre dangerouslySetInnerHTML={{ __html: message.telegram_message}} className="pl-2" />
                  </div>
                </>
              }
            </div>
          )}
          {messages.count > 10 && <Pagination>
            <PaginationItem disabled={messages.page === 1}>
              <PaginationLink first tag={Link} to={RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id) + `?page=1`} />
            </PaginationItem>
            <PaginationItem disabled={messages.page === 1}>
              <PaginationLink previous tag={Link} to={RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id) + `?page=${messages.page - 1}`} />
            </PaginationItem>
            <PaginationItem disabled={messages.page === Math.ceil(messages.count / 10)}>
              <PaginationLink next tag={Link} to={RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id) + `?page=${messages.page + 1}`} />
            </PaginationItem>
            <PaginationItem disabled={messages.page === Math.ceil(messages.count / 10)}>
              <PaginationLink last tag={Link} to={RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id) + `?page=${Math.ceil(messages.count / 10)}`} />
            </PaginationItem>
          </Pagination>}
        </>
      }
    </>
  )
}