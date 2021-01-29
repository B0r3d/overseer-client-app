import React from 'react'
import { useDispatch } from 'react-redux';
import { Row, Col, Table, Button, Badge } from 'reactstrap';
import { alertActions, modalActions, projectActions } from '../../redux';
import { ProjectApi } from '../../services';
import { ProjectAuthorizationService, TextFormatter } from '../../util';

const formatJoinedAtDate = joinedAt => {
  const date = new Date(joinedAt);

  let month = '' + (date.getMonth() + 1),
  day = '' + date.getDate(),
  year = '' + date.getFullYear(),
  hour = '' + date.getHours(),
  minutes = '' + date.getMinutes();
        
  if(month.length < 2) 
    month = '0' + month;
  if(day.length < 2) 
    day = '0' + day;
  if(hour.length < 2)
    hour = '0' + hour;
  if(minutes.length < 2)
    minutes = '0' + minutes;

  return `${day}.${month}.${year}, ${hour}:${minutes}`;
}

const INVITATION_STATUS = {
  INVITED: 'invited',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
}

const displayBadge = (status) => {
  switch(status) {
    case INVITATION_STATUS.INVITED:
      return <Badge color="primary">{TextFormatter.capitalize(status)}</Badge>
    case INVITATION_STATUS.ACCEPTED:
      return <Badge color="success">{TextFormatter.capitalize(status)}</Badge>
    case INVITATION_STATUS.DECLINED:
      return <Badge color="error">{TextFormatter.capitalize(status)}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export const ProjectMemberInvitationsRow = ({ project, user }) => {
  const dispatch = useDispatch();
  const modal = {
    onConfrim: (invitationId) => {
      ProjectApi.cancelInvitation(project.id, invitationId)
      .then(response => {
        dispatch(alertActions.successAlert("Invitation has been canceled"));
        dispatch(modalActions.closeModal());
        ProjectApi.getProject(project.id)
        .then(response => response.data)
        .then(json => {
          dispatch(projectActions.receiveProject(json.payload));
        });
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("An error has occurred, try again later."));
        dispatch(modalActions.closeModal());
      })
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    }
  }

  const openModal = invitationId => {
    dispatch(modalActions.openModal({
      onConfirm: () => modal.onConfrim(invitationId),
      onCancel: modal.onCancel,
      title: "Cancel invitation",
      description: "Are you sure you want to cancel the invitation?"
    }));
  }

  return(
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Project member invitations</h2>
          <hr className="solid" />
        </div>
        {project.invitations.length === 0 ? <p>There are no invitations to display.</p> : 
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Invited at</th>
                <th>Status</th>
                <th>Responded at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {project.invitations.map((invitation, index) => 
              <tr key={invitation.id}>
                <th scope="row">{index + 1}</th>
                <td>{invitation.username}</td>
                <td>{formatJoinedAtDate(invitation.invited_at)}</td>
                <td>{displayBadge(invitation.status)}</td>
                <td>{invitation.responded_at ? formatJoinedAtDate(invitation.responded_at) : "-"}</td>
                <td>{(ProjectAuthorizationService.isProjectOwner(user, project) && invitation.status === INVITATION_STATUS.INVITED) && <Button className="btn btn-danger" onClick={() => openModal(invitation.id)}>Cancel invitation</Button> }</td>
              </tr>
            )}
            </tbody>
          </Table>
        }
      </Col>
    </Row>
  )
}