import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { RoutingConfig } from '../Routes';

const Header = ({ auth }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return(
    <header>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/" className="mr-auto">Overseer</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-2">
                <NavLink tag={Link} to={RoutingConfig.home}>Home</NavLink>
              </NavItem>
              {!auth.isAuthenticated && <NavItem className="mr-2">
                <NavLink tag={Link} to={RoutingConfig.register}>Register</NavLink>
              </NavItem>}
              {!auth.isAuthenticated && <NavItem className="mr-2">
                <NavLink tag={Link} to={RoutingConfig.login}>Login</NavLink>
              </NavItem>}
              {auth.isAuthenticated && <NavItem className="mr-2">
                <NavLink tag={Link} to={RoutingConfig.account}>Account</NavLink>
              </NavItem>}
              {auth.isAuthenticated && <NavItem className="mr-2">
                <NavLink tag={Link} to={RoutingConfig.logout}>Logout</NavLink>
              </NavItem>}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const ConnectedHeader = connect(mapStateToProps)(Header);

export { ConnectedHeader as Header };