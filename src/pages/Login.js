import React from 'react'
import { LoginForm } from '../components'
import { Seo } from '../components';

export const Login = () => {
  return(
    <>
      <Seo pageTitle="Login" />
      <LoginForm />
    </>
  )
}