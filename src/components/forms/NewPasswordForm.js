import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { UserApi } from '../../services';

export const NewPasswordForm = ({ passwordResetTokenId }) => {
  const {register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    UserApi.setNewPassword(passwordResetTokenId, data)
    .then(response => {
      history.push(RoutingConfig.login);
      dispatch(alertActions.successAlert("New password has been set."));
    })
    .catch(error => {
      dispatch(alertActions.errorAlert("An error has occurred during setting new password"));
    })
  }

  const validateRepeatedPassword = value => watch("password") === value || "Passwords must match."

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-4">Set new password</h2>
      <FormGroup>
        <Label for="new_password_password">Pasword</Label>
        <Input type="password" name="password" id="new_password_password" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="new_password_password_repeated">Repeat password</Label>
        <Input type="password" name="password_repeated" id="new_password_password_repeated" innerRef={register({validate: validateRepeatedPassword})} required />
        {errors.password_repeated && <div className="text-danger">{errors.password_repeated.message}</div> }
      </FormGroup>
      <Button>Set new password</Button>
    </Form>
  )
}