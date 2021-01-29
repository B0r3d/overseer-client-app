import React from 'react'
import { NotFoundComponent } from '../components'
import { Seo } from '../components';

export const Page404 = () => {
  return(
    <>
      <Seo pageTitle="404 Not Found" />
      <NotFoundComponent />
    </>
  );
}