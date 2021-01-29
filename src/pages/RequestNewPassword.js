import React from 'react'
import { RequestNewPasswordForm } from '../components'
import { Seo } from '../components';

export const RequestNewPassword = () => {
  return(
    <>
      <Seo pageTitle="Forgot password" />
      <RequestNewPasswordForm />
    </>
  )
}