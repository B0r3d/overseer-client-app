import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { ProjectApi } from '../services/ProjectApi';
import { REQUEST } from '../request.constants';
import { STATUS_CODES } from '../status.constants';
import { useHistory } from 'react-router-dom';
import { RoutingConfig } from '../Routes';
import { alertActions, projectActions } from '../redux';
import { ProjectAuthorizationService } from '../util';
import { ProjectEditForm } from '../components';

const EditProject = ({ auth, projects, match}) => {
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
        setStatus(REQUEST.SUCCESS);
      })
      .catch(error => {
        const statusCode = error.request.status;

        switch(statusCode) {
          case STATUS_CODES.FORBIDDEN:
            history.push(RoutingConfig.account);
            dispatch(alertActions.errorAlert("You are not allowed to view this project"));
            break;
          default:
            setStatus(REQUEST.ERROR);
        }
      })

      setStatus(REQUEST.PENDING);
    }
    else if(!ProjectAuthorizationService.isProjectOwner(auth.user, project)) {
      history.push(RoutingConfig.projectPage.replace(":id", project.id));
      dispatch(alertActions.errorAlert("You are not allowed to edit this project."));
    }
    else {
      setStatus(REQUEST.SUCCESS);
    }
  }, []);

  return(
    <>
      {status === REQUEST.PENDING && <h2>Loading...</h2>}
      {status === REQUEST.ERROR && <h2>Failed to load project.</h2>}
      {status === REQUEST.SUCCESS && project && <ProjectEditForm project={project} />}
    </>
  )
}

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth,
});

const ConnectedPage = connect(mapStateToProps)(EditProject);

export { ConnectedPage as EditProject };