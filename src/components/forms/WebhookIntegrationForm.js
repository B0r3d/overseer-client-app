import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, FormText } from 'reactstrap';
import { alertActions, webhookIntegrationActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';

export const WebhookItegrationForm = ({ project, integration }) => {
  const [state, setState] = useState({
    url: {
      value: integration ? integration.url : "",
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

  const handleUrlChange = e => {
    const newState = {...state};
    newState.url.value = e.target.value;
    setState(newState);
  }

  const handleFilterChange = (e, index) => {
    const newState = {...state};
    newState.filters[index].value = e.target.value;
    setState(newState);
  }

  const isValidUrl = url => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newState = {...state};
    if(!isValidUrl(state.url.value)) {
      
      newState.url.error = "Invalid url.";
      setState(newState);
      return;
    }
    else {
      newState.url.error = "";
    }

    for(let i = 0; i < state.filters.length; i++) {
      console.log(state.filters[i].value);
      if(!state.filters[i].value) {
        newState.filters[i].error = "Filter value cannot be empty."
        setState(newState);
        return;
      }
    }
    newState.url.error = "";
    newState.filters.forEach(filter => {
      filter.error = "";
    });

    setState(newState);

    if(integration) {
      IntegrationApi.editWebhookIntegration(integration.id, {
        project_id: project.id,
        url: state.url.value,
        filters: state.filters.map(filter => filter.value)
      })
      .then(response => {
        
        IntegrationApi.getWebhookIntegration(integration.id)
        .then(response => response.data)
        .then(json => {
          dispatch(webhookIntegrationActions.receiveIntegrationDetails(json.payload));
          history.push(RoutingConfig.webhookintegration.replace(":id", project.id).replace(":integration_id", integration.id));
          dispatch(alertActions.successAlert("Webhook integration has been updated."));
        })
        .catch(error => {});
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("There was an error, try again later"));
      });
    }
    else {
      IntegrationApi.createWebhookIntegration({
        project_id: project.id,
        url: state.url.value,
        filters: state.filters.map(filter => filter.value)
      })
      .then(response => response.data)
      .then(json => {
        history.push(RoutingConfig.webhookintegration.replace(":id", project.id).replace(":integration_id", json.payload.id));
        dispatch(alertActions.successAlert("Webhook integration has been created."));
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("There was an error, try again later"));
      });
    }
    
  }

  return(
    <Form onSubmit={handleSubmit} className="pt-2">
      <h2 className="mb-4">{integration ? "Edit webhook integration" : "New webhook integration"}</h2>
      <FormGroup>
        <Label for="webhook_itegration_form_url">URL</Label>
        <Input name="url" id="webhook_itegration_form_url" value={state.url.value} onChange={handleUrlChange} type="text" />
        {state.url.error && <div className="text-danger">{state.url.error}</div> }
      </FormGroup>

      <p>Filters</p>
      <div className="pl-2">
      {state.filters.length === 0 ? <p>There are no filters.</p> :
        <>
          {state.filters.map((filter, index) => 
            <FormGroup key={index}>
              <Input name="url" id="webhook_itegration_form_url" value={state.filters[index].value} onChange={e => handleFilterChange(e, index)} type="text" />
              <FormText>What class name or namespace paterns should this webhook skip</FormText>
              {state.filters[index].error && <div className="text-danger">{state.filters[index].error}</div> }
              <div className="text-right text-danger"><span onClick={() => removeFilter(index)}>Delete filter</span></div>
            </FormGroup>
          )}
        </>
      }
      <div className="text-right text-primary"><p onClick={addFilter}>Add new filter</p></div>
      </div>
      <Button color="primary">{integration ? "Edit" : "New"}</Button>
    </Form>
  )
}