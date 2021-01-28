import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { UserApi } from '../../services';
import { STATUS_CODES } from '../../status.constants';

const ChangePasswordForm = ({ auth }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = data => {
    errorMessage && setErrorMessage("");
    UserApi.changePassword(auth.user.id, data)
      .then(() => {
        history.push(RoutingConfig.account);
        dispatch(alertActions.successAlert("Your password has been changed."));
      })
      .catch(error => {
        if(error.request.status === STATUS_CODES.BAD_REQUEST) {
          setErrorMessage("Invalid password.");
        }
      });
  }
  const validateRepeatedPassword = value => watch("new_password") === value || "Password must match.";
  
  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-2">Change your password</h2>
      <FormGroup>
        <Label for="change_password_current_password">Current password</Label>
        <Input type="password" name="current_password" id="change_password_current_password" innerRef={register} required />
        {errorMessage && <div className="text-danger">{errorMessage}</div> }
      </FormGroup>
      <FormGroup>
        <Label for="change_password_password">New password</Label>
        <Input type="password" name="new_password" id="change_password_password" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="change_password_password_repeated">Repeat new password</Label>
        <Input type="password" name="new_password_repeated" id="change_password_password_repeated" innerRef={register({validate: validateRepeatedPassword})} required />
        {errors.new_password_repeated && <div className="text-danger">{errors.new_password_repeated.message}</div> }
      </FormGroup>
      <Button>Change password</Button>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const ConnectedChangePasswordForm = connect(mapStateToProps)(ChangePasswordForm);

export { ConnectedChangePasswordForm as ChangePasswordForm };