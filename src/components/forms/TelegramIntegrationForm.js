import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, FormText } from 'reactstrap';
import { alertActions, telegramIntegrationActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';

export const TelegramItegrationForm = ({ project, integration }) => {
  const [state, setState] = useState({
    bot_id: {
      value: integration ? integration.bot_id : "",
      error: "",
    },
    chat_id: {
      value: integration ? integration.chat_id: "",
      error: "",
    },
    filters: integration ? [...integration.filters].map(filter => ({ value: filter, error: ""})) : [],
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const addFilter = () => {
    const newState = {...state};
    newState.filters.push({
      value: "",
      error: "",
    });
    setState(newState);
  }

  const removeFilter = index => {
    const newState = {...state};
    newState.filters.splice(index, 1);
    setState(newState);
  }

  const handleFieldChange = e => {
    const newState = {...state};
    newState[e.target.name].value = e.target.value;
    setState(newState);
  }

  const handleFilterChange = (e, index) => {
    const newState = {...state};
    newState.filters[index].value = e.target.value;
    setState(newState);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newState = {...state};
    if(!state.bot_id.value) {
      newState.bot_id.error = "Bot ID cannot be blank.";
      setState(newState);
      return;
    }
    else {
      newState.bot_id.error = "";
    }

    if(!state.chat_id.value) {
      newState.chat_id.error = "Chat ID cannot be blank.";
      setState(newState);
      return;
    }
    else {
      newState.chat_id.error = "";
    }

    for(let i = 0; i < state.filters.length; i++) {
      if(!state.filters[i].value) {
        newState.filters[i].error = "Filter value cannot be empty."
        setState(newState);
        return;
      }
    }

    newState.chat_id.error = "";
    newState.bot_id.error = "";
    newState.filters.forEach(filter => {
      filter.error = "";
    });

    setState(newState);

    if(integration) {
      IntegrationApi.editTelegramIntegration(integration.id, {
        project_id: project.id,
        bot_id: state.bot_id.value,
        chat_id: state.chat_id.value,
        filters: state.filters.map(filter => filter.value)
      })
      .then(response => {
        
        IntegrationApi.getTelegramIntegration(integration.id)
        .then(response => response.data)
        .then(json => {
          dispatch(telegramIntegrationActions.receiveIntegrationDetails(json.payload));
          history.push(RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id));
          dispatch(alertActions.successAlert("Telegram integration has been updated."));
        })
        .catch(error => {});
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("There was an error, try again later"));
      });
    }
    else {
      IntegrationApi.createTelegramIntegration({
        project_id: project.id,
        bot_id: state.bot_id.value,
        chat_id: state.chat_id.value,
        filters: state.filters.map(filter => filter.value)
      })
      .then(response => response.data)
      .then(json => {
        history.push(RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", json.payload.id));
        dispatch(alertActions.successAlert("Telegram integration has been created."));
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("There was an error, try again later"));
      });
    }
  }

  return(
    <Form onSubmit={handleSubmit} className="pt-2">
      <h2 className="mb-4">{integration ? "Edit telegram integration" : "New telegram integration"}</h2>
      <FormGroup>
        <Label for="telegram_itegration_form_bot_id">Bot ID</Label>
        <Input name="bot_id" id="telegram_itegration_form_bot_id" value={state.bot_id.value} onChange={handleFieldChange} type="text" />
        <FormText>Telegram bot ID created with Bot Father.</FormText>
        {state.bot_id.error && <div className="text-danger">{state.bot_id.error}</div> }
      </FormGroup>

      <FormGroup>
        <Label for="telegram_itegration_form_chat_id">Chat ID</Label>
        <Input name="chat_id" id="telegram_itegration_form_chat_id" value={state.chat_id.value} onChange={handleFieldChange} type="text" />
        <FormText>Telegram chat ID.</FormText>
        {state.chat_id.error && <div className="text-danger">{state.chat_id.error}</div> }
      </FormGroup>
      <p>Filters</p>
      <div className="pl-2">
      {state.filters.length === 0 ? <p>There are no filters.</p> :
        <>
          {state.filters.map((filter, index) => 
            <FormGroup key={index}>
              <Input name={`filter_${index}`} id={`telegram_itegration_form_filter_${index}`} value={state.filters[index].value} onChange={e => handleFilterChange(e, index)} type="text" />
              <FormText>What class name or namespace paterns should this telegram integration skip</FormText>
              {state.filters[index].error && <div className="text-danger">{state.filters[index].error}</div> }
              <div className="text-right text-danger"><span style={{cursor: "pointer"}} onClick={() => removeFilter(index)}>Delete filter</span></div>
            </FormGroup>
          )}
        </>
      }
      <div className="text-right text-primary"><span onClick={addFilter} style={{cursor: "pointer"}}>Add new filter</span></div>
      </div>
      <Button color="primary">{integration ? "Edit" : "New"}</Button>
    </Form>
  )
}