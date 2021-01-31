import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Seo, TelegramItegrationForm } from '../components';
import { alertActions, projectActions, telegramIntegrationActions } from '../redux';
import { REQUEST } from '../request.constants';
import { RoutingConfig } from '../Routes';
import { IntegrationApi, ProjectApi } from '../services';
import { STATUS_CODES } from '../status.constants';

const EditTelegramIntegration = ({ projects, telegramIntegrations, match, auth }) => {
  const projectId = match.params.id;
  const integrationId = match.params.integration_id;
  const [status,setStatus] = useState(REQUEST.PENDING);
  const dispatch = useDispatch();
  const history = useHistory();
  const integration = telegramIntegrations.currentIntegration;
  const project = projects.currentProject;

  useEffect(() => {
    if(!integration || integration.id !== integrationId) {
      IntegrationApi.getTelegramIntegration(integrationId)
      .then(response => response.data)
      .then(json => {
        const { payload } = json;
        if(payload.project_id !== projectId) {
          history.push(RoutingConfig.account);
          dispatch(alertActions.errorAlert("Invalid telegram integration"));
          return;
        }

        if(!project || project.id !== projectId) {
          ProjectApi.getProject(projectId)
          .then(response => response.data)
          .then(json => {
            dispatch(projectActions.receiveProject(json.payload));
            setStatus(REQUEST.SUCCESS);
          })
          .catch(error => {
            setStatus(REQUEST.ERROR);
          })
        }
        else {
          setStatus(REQUEST.SUCCESS);
        }
        dispatch(telegramIntegrationActions.receiveIntegrationDetails(payload));        
      })
      .catch(error => {
        const statusCode = error.request.status;
        switch(statusCode) {
          case STATUS_CODES.FORBIDDEN:
            history.push(RoutingConfig.account);
            dispatch(alertActions.errorAlert("You are not allowed to view this error"));
            break;
          default:
            setStatus(REQUEST.ERROR);
        }
      })
    }
    else {
      setStatus(REQUEST.SUCCESS);
    }
  });

  return(
    <>
      {<Seo pageTitle="Edit telegram integration" />}
      {status === REQUEST.PENDING && <h2>Loading...</h2>}
      {status === REQUEST.ERROR && <h2>Failed to load project.</h2>}
      {status === REQUEST.SUCCESS && (integration && project) && <TelegramItegrationForm integration={integration} project={project} /> }
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
  telegramIntegrations: state.telegramIntegrations,
})

const ConnectedPage = connect(mapStateToProps)(EditTelegramIntegration);

export { ConnectedPage as EditTelegramIntegration };