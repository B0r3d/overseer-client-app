import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Row, Col, Table, Button, Label, Input, FormGroup, FormText } from 'reactstrap';
import { alertActions, modalActions, projectActions } from '../../redux';
import { ProjectApi } from '../../services';
import { ProjectAuthorizationService } from '../../util'

const formatExpirationDate = expirationDate => {
  const date = new Date(expirationDate);

  let month = '' + (date.getMonth() + 1),
  day = '' + date.getDate(),
  year = '' + date.getFullYear();
        
  if(month.length < 2) 
    month = '0' + month;
  if(day.length < 2) 
    day = '0' + day;

  return `${day}.${month}.${year}`;
}

export const ProjectApiKeysRow = ({ project, user }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const createApiKeyModal = {
    onConfirm: () => {
      let date;

      if(ref.current.value) {
        date = new Date(ref.current.value+"T00:00");
        const now = Date.now();

        if(now > date.getTime()) {
          ref.current.classList.add('is-invalid');
          ref.current.focus();
          return;
        }
      }

      ProjectApi.createApiKey(project.id, date ? date.getTime() / 1000 : '')
      .then(response => {
        dispatch(alertActions.successAlert("API key has been created."));
        dispatch(modalActions.closeModal());
        ProjectApi.getProject(project.id)
        .then(response => response.data)
        .then(json => {
          dispatch(projectActions.receiveProject(json.payload));
        });
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("We encountered an error, try again later."));
        dispatch(modalActions.closeModal());
      });
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    },
    title: "Create new API key",
    description:
      <FormGroup>
        <Label for="create_api_key_expiration_date">Expiration date</Label>
        <Input type="date" name="expiration_date" innerRef={ref} id="create_api_key_expiration_date" />
        <FormText>Optional: choose expiry date, any future date.</FormText>
      </FormGroup>,
  }

  const openCreateApiKeyModal = () => {
    dispatch(modalActions.openModal({
      onConfirm: createApiKeyModal.onConfirm,
      onCancel: createApiKeyModal.onCancel,
      title: createApiKeyModal.title,
      description: createApiKeyModal.description,
    }));
  }

  const deleteApiKeyModal = {
    onConfirm: (apiKeyId) => {
      ProjectApi.deleteApiKey(project.id, apiKeyId)
      .then(response => {
        dispatch(alertActions.successAlert("API key has been deleted."));
        dispatch(modalActions.closeModal());
        ProjectApi.getProject(project.id)
        .then(response => response.data)
        .then(json => {
          dispatch(projectActions.receiveProject(json.payload));
        });
      })
      .catch(error => {
        dispatch(alertActions.errorAlert("We encountered an error, try again later."));
        dispatch(modalActions.closeModal());
      });
    },
    onCancel: () => {
      dispatch(modalActions.closeModal());
    },
    title: "Delete API key",
    description: "Are you sure you want to delete this API key? Project integration will be unable to communicate using this key."
  }

  const openDeleteApiKeyModal = apiKeyId => {
    dispatch(modalActions.openModal({
      onConfirm: () => deleteApiKeyModal.onConfirm(apiKeyId),
      onCancel: deleteApiKeyModal.onCancel,
      title: deleteApiKeyModal.title,
      description: deleteApiKeyModal.description,
    }));
  }

  return(
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Project API keys</h2>
          <hr className="solid" />
        </div>
        {ProjectAuthorizationService.isProjectOwner(user, project) && 
          <Row>
            <Col className="mb-4">
            <Button color="primary" onClick={openCreateApiKeyModal}>Create new API Key</Button>
            </Col>
          </Row>
        }
        {project.api_keys.length === 0 ? <p>There are no API keys to display.</p> : 
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Key</th>
                <th>Expiration Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {project.api_keys.map((key, index) => 
              <tr key={key.id}>
                <th scope="row">{index + 1}</th>
                <th>{key.value}</th>
                <th>{key.expiry_date ? formatExpirationDate(key.expiry_date) : '-'}</th>
                <th>{ProjectAuthorizationService.isProjectOwner(user, project) && <Button color="danger" onClick={() => openDeleteApiKeyModal(key.id)}>Delete key</Button>}</th>
              </tr>
            )}
            </tbody>
          </Table>
        }
      </Col>
    </Row>
  )
}