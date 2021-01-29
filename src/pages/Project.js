import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { ProjectApi } from '../services/ProjectApi';
import { REQUEST } from '../request.constants';
import { STATUS_CODES } from '../status.constants';
import { useHistory } from 'react-router-dom';
import { RoutingConfig } from '../Routes';
import { alertActions, projectActions } from '../redux';
import { ProjectCard } from '../components';
import { Seo } from '../components';

const Project = ({ projects, auth, match }) => {
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
    else {
      setStatus(REQUEST.SUCCESS);
    }
  }, []);

  return(
    <>
      {<Seo pageTitle={project ? project.title : ''} />}
      {status === REQUEST.PENDING && <h2>Loading...</h2>}
      {status === REQUEST.ERROR && <h2>Failed to load project.</h2>}
      {status === REQUEST.SUCCESS && project && <ProjectCard project={project} user={auth.user} />}
    </>
  )
}

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth,
});

const ConnectedPage = connect(mapStateToProps)(Project);

export { ConnectedPage as Project };