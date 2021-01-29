import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row, Button } from 'reactstrap';
import { alertActions } from '../redux';
import { RoutingConfig } from '../Routes';
import { ProjectApi } from '../services';
import { STATUS_CODES } from '../status.constants';
import { Seo } from '../components';

export const ManageInvitation = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const history = useHistory();

  const projectId = queryParams.get("projectId");
  const invitationId = queryParams.get("invitationId");

  const onAccept = () => {
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

  const onCancel = () => {
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
    <Container className="pt-4">
      <Seo pageTitle="Manage invitation" />
      <Row>
        <Col>
          <div className="mb-4">
            <h2>Manage project invitation</h2>
            <hr className="solid" />
          </div>
          <Button className="btn btn-primary mr-2" onClick={onAccept}>Accept</Button>
          <Button className="btn btn-danger" onClick={onCancel}>Decline</Button>
        </Col>
      </Row>
    </Container>
  )
}