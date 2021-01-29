import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions, projectActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { ProjectApi } from '../../services/ProjectApi';

export const ProjectEditForm = ({ project }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      project_description: project.description,
    }
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    ProjectApi.updateProject(project.id, data)
    .then(response => {
      dispatch(projectActions.projectUpdated({ description: data.project_description }))
      history.push(RoutingConfig.projectPage.replace(":id", project.id));
      dispatch(alertActions.successAlert("Project has been updated."))
    })
    .catch(error => {
      dispatch(alertActions.errorAlert("An error occurred during project update, pleas try again later."));
    })
  }

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-2">Edit project {project.title}</h2>
      <FormGroup>
        <Label for="create_new_project_project_description">Description</Label>
        <Input type="textarea" name="project_description" id="create_new_project_project_description" innerRef={register} />
      </FormGroup>
      <Button>Update project</Button>
    </Form>
  );
}