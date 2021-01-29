import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { REQUEST } from '../request.constants';
import { ProjectApi } from '../services/ProjectApi';
import { Button, Table } from 'reactstrap';
import { alertActions, projectActions } from '../redux';
import { Link, useHistory } from 'react-router-dom';
import { RoutingConfig } from '../Routes';
import { STATUS_CODES } from '../status.constants';

const ProjectList = ({ projects }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [status, setStatus] = useState(REQUEST.PENDING);

  const requestProjects = () => {
    ProjectApi.getProjects()
    .then(response => response.data)
    .then(json => {
      setStatus(REQUEST.SUCCESS);
      dispatch(projectActions.receiveProjects(json.payload));
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    })
  }
  useEffect(() => {
    requestProjects();
  }, []);

  const onAccept = (projectId, invitationId) => {
    ProjectApi.acceptInvitation(projectId, invitationId)
    .then(() => {
      history.push(RoutingConfig.projectPage.replace(":id", projectId));
      dispatch(alertActions.successAlert("You have joined a new project."))
    })
    .catch(error => {
      const statusCode = error.request.status;

      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          dispatch(alertActions.errorAlert("Invalid invitation."));
          break;
        case STATUS_CODES.NOT_FOUND:
          dispatch(alertActions.errorAlert("This invitation does not exist."));
          break;
        default:
          dispatch(alertActions.errorAlert("We encountered an error during the request, try again later."))
      }
    });
  }

  const onCancel = (projectId, invitationId) => {
    ProjectApi.acceptInvitation(projectId, invitationId)
    .then(() => {
      history.push(RoutingConfig.account);
      dispatch(alertActions.successAlert("You have declined the invitation."))
    })
    .catch(error => {
      const statusCode = error.request.status;

      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          dispatch(alertActions.errorAlert("Invalid invitation."));
          break;
        case STATUS_CODES.NOT_FOUND:
          dispatch(alertActions.errorAlert("This invitation does not exist."));
          break;
        default:
          dispatch(alertActions.errorAlert("We encountered an error during the request, try again later."))
      }
    });
  }
  return(
    <>
      {status === REQUEST.PENDING && <h3>Loading...</h3> }
      {status === REQUEST.ERROR && <h3>Failed to load projects.</h3>}
      {status === REQUEST.SUCCESS && 
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.items.map((project, index) =>
              <tr key={project.id}>
                <th scope="row">{index + 1}</th>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.invitation ? 
                  <>
                    <Button className="btn btn-primary mr-2" onClick={() => onAccept(project.id, project.invitation.id) }>Accept invitation</Button>
                    <Button className="btn btn-danger" onClick={() => onCancel(project.id, project.invitation.id) }>Decline invitation</Button>
                  </> :
                  <Link to={RoutingConfig.projectPage.replace(":id", project.id)}>Show</Link>}</td>
              </tr>
            )}
          </tbody>
        </Table>
      }
    </>
  )
}

const mapStateToProps = state => ({
  projects: state.projects,
})

const ConnectedProjectList = connect(mapStateToProps)(ProjectList);

export { ConnectedProjectList as ProjectList };