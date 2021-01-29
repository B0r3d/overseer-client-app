import React from 'react'
import {Helmet} from "react-helmet";

export const Seo = ({ pageTitle = "" }) => {
  return(
    <Helmet>
      <title>{ pageTitle ? `${pageTitle} | Overseer` : 'Overseer'}</title>
    </Helmet>
  )
}