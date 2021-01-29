import React from 'react'
import { Container } from 'reactstrap'
import { RegisterForm } from '../components'
import { Seo } from '../components';

export const Register = () => {
  return(
    <Container>
      <Seo pageTitle="Register" />
      <RegisterForm />
    </Container>
  )
}