import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProjectList, Seo } from '../components'
import { RoutingConfig } from '../Routes'

const Account = ({ auth }) => {
  return(
    <div className="container">
      <Seo pageTitle="Account" />
      <h2>Welcome {auth.user.username}</h2>
      <Link to={RoutingConfig.newProject}>Create new project</Link><br />
      <Link to={RoutingConfig.changePassword}>Change password</Link><br />
      <Link to={RoutingConfig.deleteAccount}>Delete account</Link>

      <ProjectList />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const ConnectedAccount = connect(mapStateToProps)(Account);

export { ConnectedAccount as Account };