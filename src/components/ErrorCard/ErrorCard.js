import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { RoutingConfig } from '../../Routes';

const formatDate = occurredAt => {
  const date = new Date(occurredAt);

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

export const ErrorCard = ({ error, projectId }) => {
  return(
    <Container className="pt-4">
      <Row>
        <Col>
          <div className="mb-4">
            <h2>{error.class}</h2>
            <hr className="solid" />
          </div>
          <p>Occurred at: <strong>{formatDate(error.occurred_at)}</strong></p>
          <p>Error code: <strong>{error.error_code}</strong></p>
          {error.error_message && <p>Error message: <strong>{error.error_message}</strong></p> }
          <p>File: <strong>{error.file}</strong> at line: <strong>{error.line}</strong></p>
          {error.stacktrace.length && 
            <>
              <h3>Stacktrace</h3>
              <ListGroup flush>
                {error.stacktrace.map((exception, index) =>
                  <ListGroupItem key={index}>
                    <ListGroupItemHeading>{`${index + 1}. ${exception.class}`}</ListGroupItemHeading>
                    <hr className="solid" />
                    <ListGroupItemText style={{paddingLeft: "20px"}}>
                    Error code: <strong>{exception.error_code}</strong><br />
                    {exception.error_message && <>Error message: <strong>{exception.error_message}</strong><br /></> }
                    File: <strong>{exception.file}</strong> at line: <strong>{exception.line}</strong>
                    </ListGroupItemText>
                  </ListGroupItem>
                )}
              </ListGroup>
            </>
          }
          <Link to={RoutingConfig.projectPage.replace(":id", projectId)} className="btn btn-primary">Go back to project</Link>
        </Col>
      </Row>
    </Container>
  )
}