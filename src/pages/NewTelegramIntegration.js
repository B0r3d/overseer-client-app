import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Seo, TelegramItegrationForm } from '../components';
import { alertActions, projectActions } from '../redux';
import { REQUEST } from '../request.constants';
import { RoutingConfig } from '../Routes';
import { ProjectApi } from '../services';
import { STATUS_CODES } from '../status.constants';
import { ProjectAuthorizationService } from '../util';

const NewTelegramIntergration = ({ projects, match, auth }) => {
  const projectId = match.params.id;
  const project = projects.currentProject;
  const [status,setStatus] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(!project || project.id !== projectId) {
      ProjectApi.getProject(projectId)
      .then(response => response.data)
      .then(json => {
        dispatch(projectActions.receiveProject(json.payload));

        if(!ProjectAuthorizationService.isProjectOwner(auth.user, json.payload)) {
          history.push(RoutingConfig.projectPage.replace(":id", json.payload.id));
          dispatch(alertActions.errorAlert("You are not allowed to create telegram integration in this project"));
        }
        else {
          setStatus(REQUEST.SUCCESS);
        }
      })
      .catch(error => {
        console.log(error);
        const statusCode = error.request.status;

        switch(statusCode) {
          case STATUS_CODES.FORBIDDEN:
            history.push(RoutingConfig.account);
            dispatch(alertActions.errorAlert("You are not allowed to create telegram integration in this project"));
            break;
          default:
            setStatus(REQUEST.ERROR);
        }
      })

      setStatus(REQUEST.PENDING);
    }
    else {
      setStatus(REQUEST.SUCCESS);
    }
  }, []);

  return(
    <>
      {<Seo pageTitle="New telegram integration" />}
      {status === REQUEST.PENDING && <h2>Loading...</h2>}
      {status === REQUEST.ERROR && <h2>Failed to load project.</h2>}
      {status === REQUEST.SUCCESS && project && <TelegramItegrationForm project={project} /> }
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
});

const ConnectedPage = connect(mapStateToProps)(NewTelegramIntergration);

export { ConnectedPage as NewTelegramIntergration };