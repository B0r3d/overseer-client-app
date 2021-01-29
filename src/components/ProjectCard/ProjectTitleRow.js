import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'
import { alertActions, modalActions, projectActions } from '../../redux'
import { RoutingConfig } from '../../Routes'
import { ProjectApi } from '../../services'
import { ProjectAuthorizationService } from '../../util'

export const ProjectTitleRow = ({ project, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteProjectModal = {
    onConfirm: () => {
      ProjectApi.deleteProject(project.id)
      .then(response => {
        dispatch(projectActions.eraseProjects());
        dispatch(modalActions.closeModal());
        history.push(RoutingConfig.account);
        dispatch(alertActions.successAlert("Project has been deleted."));
      })
      .catch(error => {
        dispatch(modalActions.closeModal());
        dispatch(alertActions.errorAlert("We encountered an error, try again later"));
      })
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    },
    title: "Delete project",
    description: "Are you sure you want to delete the project? All data will be lost."
  }

  const openDeleteProjectModal = () => {
    dispatch(modalActions.openModal({
      ...deleteProjectModal
    }));
  }

  return(
    <Row className="mb-4">
      <Col>
        <div className="mb-4">
          <h2>{project.title}</h2>
          <hr className="solid" />
        </div>
        <p>{project.description}</p>
        { ProjectAuthorizationService.isProjectOwner(user, project) && <Link className="btn btn-primary mr-2" to={RoutingConfig.editProject.replace(":id", project.id)}>Edit</Link>}
        { ProjectAuthorizationService.isProjectOwner(user, project) && <Button color="danger" onClick={openDeleteProjectModal}>Delete project</Button>}
      </Col>
    </Row>
  );
}