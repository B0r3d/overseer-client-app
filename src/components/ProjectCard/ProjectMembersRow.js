import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Row, Col, Form, FormGroup, Input, Label, Button, Table } from 'reactstrap';
import { useDebounce } from '../../hooks';
import { UserApi, ProjectApi } from '../../services';
import styles from './style.module.css';
import { alertActions, modalActions, projectActions } from '../../redux';
import { STATUS_CODES } from '../../status.constants';
import { ProjectAuthorizationService } from '../../util';

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

export const ProjectMembersRow = ({ project, user }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();

  // Effect for API call 
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        UserApi.getUsers(searchTerm)
        .then(response => response.data)
        .then(json => {
          setIsSearching(false);
          setResults(json.payload.items);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const onSubmit = e => {
    e.preventDefault();
    const user = results.find(user => user.username === inputValue);
    if(user) {
      ProjectApi.inviteNewMember(project.id, user.username, user.email)
      .then(() => {
        ProjectApi.getProject(project.id)
        .then(response => response.data)
        .then(json => {
          dispatch(projectActions.receiveProject(json.payload));
        });
        dispatch(alertActions.successAlert("Project member has been invited."));
      })
      .catch(error => {
        const statusCode = error.request.status;
        
        switch(statusCode) {
          case STATUS_CODES.BAD_REQUEST:
            dispatch(alertActions.errorAlert(`User ${user.username} is already invited.`));
            break;
          default:
            dispatch(alertActions.errorAlert("There was an error while inviting project member, try again later."));
        }
      })
    }
  }

  const modal = {
    onConfirm: memberId => {
      ProjectApi.removeProjectMemeber(project.id, memberId)
      .then(() => {
        ProjectApi.getProject(project.id)
        .then(response => response.data)
        .then(json => {
          dispatch(projectActions.receiveProject(json.payload));
        });
        dispatch(alertActions.successAlert("Project member has been deleted."));
        dispatch(modalActions.closeModal());
      })
      .catch(() => {
        dispatch(alertActions.errorAlert("We encountered a problem, try again later."));
        dispatch(modalActions.closeModal());
      });
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    },
    title: "Delete project member",
    description: "Are you sure you want to delete this project member?",
  }

  const openModal = (memberId) => {
    dispatch(modalActions.openModal({
      onConfirm: () => modal.onConfirm(memberId),
      onCancel: modal.onCancel,
      title: modal.title,
      description: modal.description
    }));
  }
  return(
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Project members</h2>
          <hr className="solid" />
        </div>
        {ProjectAuthorizationService.isProjectOwner(user, project) && <Form className="mb-4" onSubmit={onSubmit}>
          <Row form>
            <Col lg="8">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="project_member_invitation_login" hidden>Invite new member</Label>
                <Input type="text" name="login" id="project_member_invitation_login" value={inputValue} onChange={e => { setSearchTerm(e.target.value); setInputValue(e.target.value)} } placeholder="Invite new member..." />
                {searchTerm && isSearching === false && <div className={styles['autocomplete-wrapper']}>
                  <ul className={styles['autocomplete-list']}>
                    {results.map((user, index) => <li className={styles['autocomplete-item']} onClick={() => {setInputValue(user.username); setIsSearching(true)} } key={index}>{user.username}</li>)}
                  </ul>
                </div>}
              </FormGroup>
            </Col>
            <Col lg="4">
              <Button>Invite</Button>
            </Col>
          </Row>
        </Form>}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Joined at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {project.project_members.map((member, index) => 
              <tr key={member.id}>
                <th scope="row">{index + 1}</th>
                <td>{member.username}</td>
                <td>{formatJoinedAtDate(member.joined_at)}</td>
                <td>{(ProjectAuthorizationService.isProjectOwner(user, project) && member.username !== user.username) && <Button className="btn btn-danger" onClick={() => openModal(member.id)}>Delete member</Button> }</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}