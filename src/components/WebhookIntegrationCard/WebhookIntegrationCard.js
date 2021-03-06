import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row, Button } from 'reactstrap';
import { alertActions, modalActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';
import { ProjectAuthorizationService } from '../../util';
import { WebhookIntegrationMessagesRow } from './WebhookIntegrationMessagesRow';
import { WebhookIntegrationTitleRow } from './WebhookIntegrationTitleRow';

export const WebhookIntegrationCard = ({ integration, project, user, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteIntegrationModal = {
    onConfirm: () => {
      IntegrationApi.deleteWebhookIntegration(integration.id)
      .then(response => {
        history.push(RoutingConfig.projectPage.replace(":id", project.id));
        dispatch(alertActions.successAlert("Webhook integration has been deleted."));
        dispatch(modalActions.closeModal());
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("There was an error, try again later."));
        dispatch(modalActions.closeModal());
      })
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    },
    title: "Delete webhook integration",
    description: "Are you sure you want to delete this integration? All data will be lost.",
  }

  const openDeleteIntegrationModal = () => {
    dispatch(modalActions.openModal({
      onConfirm: deleteIntegrationModal.onConfirm,
      onCancel: deleteIntegrationModal.onCancel,
      title: deleteIntegrationModal.title,
      description: deleteIntegrationModal.description,
    }));
  }
  return(
    <Container>
      <Row>
        <Col className="pb-4">
          <WebhookIntegrationTitleRow integration={integration} />
          <div className="mb-4">
            {ProjectAuthorizationService.isProjectOwner(user, project) && <Link className="btn btn-secondary mr-2" to={RoutingConfig.editWebhookintegration.replace(":id", project.id).replace(":integration_id", integration.id)}>Edit</Link>}
            {ProjectAuthorizationService.isProjectOwner(user, project) && <Button color="danger" onClick={openDeleteIntegrationModal}>Delete</Button>}
          </div>
          <WebhookIntegrationMessagesRow project={project} integration={integration} location={location} />
          <Link to={RoutingConfig.projectPage.replace(":id", project.id)} className="btn btn-primary">Go back to project</Link>
        </Col>
      </Row>
    </Container>
  );
}