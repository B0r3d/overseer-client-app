import React from 'react'
import { DeleteAccountForm, Seo } from '../components'

export const DeleteAccount = () => {
  return(
    <>
      <Seo pageTitle="Delete account" />
      <DeleteAccountForm />
    </>
  )
}