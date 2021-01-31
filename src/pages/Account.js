import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProjectList, Seo } from '../components'
import { RoutingConfig } from '../Routes'

const Account = ({ auth, location }) => {
  return(
    <div className="container pt-4">
      <Seo pageTitle="Account" />
      <div className="mb-4">
        <h2 className="mb-4">Welcome {auth.user.username}</h2>
        <Link className="btn btn-primary mr-2" to={RoutingConfig.newProject}>Create new project</Link>
        <Link className="btn btn-secondary mr-2" to={RoutingConfig.changePassword}>Change password</Link>
        <Link className="btn btn-danger" to={RoutingConfig.deleteAccount}>Delete account</Link>
      </div>
      <ProjectList location={location} />
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const ConnectedAccount = connect(mapStateToProps)(Account);

export { ConnectedAccount as Account };