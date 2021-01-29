import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { ProjectApi } from '../../services/ProjectApi';

export const NewProjectForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    ProjectApi.createProject(data)
    .then(response => {
      history.push(RoutingConfig.account);
      dispatch(alertActions.successAlert("Project has been created."));
    })
    .catch(error => {
      dispatch(alertActions.errorAlert("There was an error creating the project."));
    });
  }

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-2">Create new project</h2>
      <FormGroup>
        <Label for="create_new_project_project_title">Title</Label>
        <Input type="text" name="project_title" id="create_new_project_project_title" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="create_new_project_project_description">Description</Label>
        <Input type="textarea" name="project_description" id="create_new_project_project_description" innerRef={register} />
      </FormGroup>
      <Button>Create project</Button>
    </Form>
  );
}