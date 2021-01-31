import React from 'react'

const formatDate = createdAt => {
  const date = new Date(createdAt);

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

export const TelegramIntegrationTitleRow = ({ integration }) => {
  return(
    <>
      <div className="mb-4">
        <h2>Telegram integration</h2>
        <hr className="solid" />
      </div>
      <p>Created at: <strong>{formatDate(integration.created_at)}</strong></p>
      <p>Bot ID: <strong>{integration.bot_id}</strong></p>
      <p>Chat ID: <strong>{integration.chat_id}</strong></p>
      <p>Filters:</p>
      <div className="pl-2 mb-4">
        {integration.filters.length === 0 ? <p>There are no filters</p> :
          <ul>
            {integration.filters.map((filter, index) => <li key={index}><strong>{filter}</strong></li>)}
          </ul>
        }
      </div>
    </>
  )
}