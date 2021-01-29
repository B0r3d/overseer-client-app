import React from 'react'
import { NewProjectForm } from '../components'
import { Seo } from '../components';

export const NewProject = () => {
  return(
    <>
      <Seo pageTitle="New project" />
      <NewProjectForm />
    </>
  )
}