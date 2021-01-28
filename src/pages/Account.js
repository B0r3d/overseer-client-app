import React from 'react'
import { Link } from 'react-router-dom'
import { RoutingConfig } from '../Routes'

export const Account = () => {
  return(
    <div className="container">
      <Link to={RoutingConfig.changePassword}>Change password</Link>
    </div>
  )
}