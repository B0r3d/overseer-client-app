import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { REQUEST } from '../request.constants';
import { ProjectApi } from '../services/ProjectApi';
import { Button, Table, Pagination, PaginationItem, PaginationLink, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { alertActions, projectActions } from '../redux';
import { Link, useHistory } from 'react-router-dom';
import { RoutingConfig } from '../Routes';
import { STATUS_CODES } from '../status.constants';
import { useForm } from 'react-hook-form';

const ProjectList = ({ projects, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [status, setStatus] = useState(REQUEST.PENDING);
  const urlParams = new URLSearchParams(location.search);
  const criteria = {
    search: urlParams.get("search") || "",
  }
  const { register, handleSubmit} = useForm({
    defaultValues: {
      search: criteria.search,
    }
  });
  
  const requestProjects = () => {
    ProjectApi.getProjects(urlParams.get("page") || 1, criteria.search)
    .then(response => response.data)
    .then(json => {
      setStatus(REQUEST.SUCCESS);
      dispatch(projectActions.receiveProjects(json.payload));
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    })
  }
  useEffect(() => {
    requestProjects();
  }, [urlParams.get("errors_page"), urlParams.get("search")]);

  const onAccept = (projectId, invitationId) => {
    ProjectApi.acceptInvitation(projectId, invitationId)
    .then(() => {
      history.push(RoutingConfig.projectPage.replace(":id", projectId));
      dispatch(alertActions.successAlert("You have joined a new project."))
    })
    .catch(error => {
      const statusCode = error.request.status;

      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          dispatch(alertActions.errorAlert("Invalid invitation."));
          break;
        case STATUS_CODES.NOT_FOUND:
          dispatch(alertActions.errorAlert("This invitation does not exist."));
          break;
        default:
          dispatch(alertActions.errorAlert("We encountered an error during the request, try again later."))
      }
    });
  }

  const onCancel = (projectId, invitationId) => {
    ProjectApi.acceptInvitation(projectId, invitationId)
    .then(() => {
      history.push(RoutingConfig.account);
      dispatch(alertActions.successAlert("You have declined the invitation."))
    })
    .catch(error => {
      const statusCode = error.request.status;

      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          dispatch(alertActions.errorAlert("Invalid invitation."));
          break;
        case STATUS_CODES.NOT_FOUND:
          dispatch(alertActions.errorAlert("This invitation does not exist."));
          break;
        default:
          dispatch(alertActions.errorAlert("We encountered an error during the request, try again later."))
      }
    });
  }

  const onSubmit = data => {    
    history.replace(`${RoutingConfig.account}?page=1&search=${data.search}`);
  }

  return(
    <>
      {status === REQUEST.PENDING && <h3>Loading...</h3> }
      {status === REQUEST.ERROR && <h3>Failed to load projects.</h3>}
      {status === REQUEST.SUCCESS && 
        <>
          <div className="mb-4">
            <h2>Projects</h2>
            <hr className="solid" />
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <Row>
                <Col lg="8">
                  <FormGroup>
                    <Label for="error_search_form_search">Search term</Label>
                    <Input type="text" name="search" id="error_search_form_search" innerRef={register} />
                  </FormGroup>
                </Col>
              </Row>

              <Button color="primary" className="mr-2">Filter</Button>
            </Form>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.items.map((project, index) =>
                <tr key={project.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.invitation ? 
                    <>
                      <Button className="btn btn-primary mr-2" onClick={() => onAccept(project.id, project.invitation.id) }>Accept invitation</Button>
                      <Button className="btn btn-danger" onClick={() => onCancel(project.id, project.invitation.id) }>Decline invitation</Button>
                    </> :
                    <Link to={RoutingConfig.projectPage.replace(":id", project.id)}>Show</Link>}</td>
                </tr>
              )}
            </tbody>
        </Table>
        {projects.count > 10 &&
              <Pagination>
                <PaginationItem disabled={projects.page === 1}>
                  <PaginationLink first tag={Link} to={RoutingConfig.account + `?page=1`} />
                </PaginationItem>
                <PaginationItem disabled={projects.page === 1}>
                  <PaginationLink previous tag={Link} to={RoutingConfig.account + `?page=${projects.page - 1}`} />
                </PaginationItem>
                <PaginationItem disabled={projects.page === Math.ceil(projects.count / 10)}>
                  <PaginationLink next tag={Link} to={RoutingConfig.account + `?page=${projects.page + 1}`} />
                </PaginationItem>
                <PaginationItem disabled={projects.page === Math.ceil(projects.count / 10)}>
                  <PaginationLink last tag={Link} to={RoutingConfig.account + `?page=${Math.ceil(projects.count / 10)}`} />
                </PaginationItem>
              </Pagination>
            }
        </>
      }
    </>
  )
}

const mapStateToProps = state => ({
  projects: state.projects,
})

const ConnectedProjectList = connect(mapStateToProps)(ProjectList);

export { ConnectedProjectList as ProjectList };