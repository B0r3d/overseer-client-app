import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Input, Label, Button, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { errorActions } from '../../redux/actions/error.actions';
import { REQUEST } from '../../request.constants';
import { RoutingConfig } from '../../Routes';
import { ProjectApi } from '../../services';

const formatDate = occurredAt => {
  const date = new Date(occurredAt);

  let month = '' + (date.getMonth() + 1),
  day = '' + date.getDate(),
  year = '' + date.getFullYear(),
  hour = '' + date.getHours(),
  minutes = '' + date.getMinutes();
        
  if(month.length < 2) 
    month = '0' + month;
  if(day.length < 2) 
    day = '0' + day;
  if(hour.length < 2)
    hour = '0' + hour;
  if(minutes.length < 2)
    minutes = '0' + minutes;

  return `${day}.${month}.${year}, ${hour}:${minutes}`;
}

export const ProjectErrorsRow = ({ project, errors, location }) => {
  const [status,setStatus] = useState(REQUEST.PENDING);
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);
  const { register, handleSubmit, watch} = useForm();
  const [criteria, setCriteria] = useState({
    search: '',
    date_from: '',
    date_to: '',
  });

  const requestErrors = () => {
    console.log(criteria);
    ProjectApi.getErrors(project.id, {
      page: urlParams.get("page") || 1,
      ...criteria,
    })
    .then(response => response.data)
    .then(json => {
      setStatus(REQUEST.SUCCESS);
      dispatch(errorActions.receiveErrors(json.payload));
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    });
  }

  useEffect(() => {
    requestErrors();
  }, [urlParams.get("page"), criteria]);

  const onSubmit = data => {
    const newCriteria = {...data};
    if(data.search) {
      newCriteria.search = data.search;
    }

    if(data.date_from) {
      const date = new Date(data.date_from  +"T00:00");
      newCriteria.date_from = date.getTime() / 1000;
    }

    if(data.date_to) {
      const date = new Date(data.date_to  +"T00:00");
      newCriteria.date_to = date.getTime() / 1000;
    }
    
    setCriteria(newCriteria);
  }

  return(
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Project errors</h2>
          <hr className="solid" />
        </div>
        {status === REQUEST.PENDING && <p>Loading...</p> }
        {status === REQUEST.ERROR && <p>Failed to load errors.</p> }
        {status === REQUEST.SUCCESS &&
          <>
            <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <Row>
                <Col lg="8">
                  <FormGroup>
                    <Label for="error_search_form_search">Search term</Label>
                    <Input type="text" name="search" id="error_search_form_search" innerRef={register} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="4">
                  <Label for="error_search_form_search">Occurred from</Label>
                  <Input type="date" name="date_from" id="error_search_form_date_from" innerRef={register} />
                </Col>
                <Col lg="4">
                  <Label for="error_search_form_search">Occurred to</Label>
                  <Input type="date" name="date_to" id="error_search_form_date_to" innerRef={register} />
                </Col>
              </Row>

              <Button color="primary">Filter</Button>
            </Form>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exception class</th>
                  <th>Error code</th>
                  <th>Occured at</th>
                  <th>File</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {errors.items.map((error, index) => 
                  <tr key={error.id}>
                    <th scope="row">{index + 1 + (errors.page - 1) * 10}</th>
                    <td>{error.class}</td>
                    <td>{error.error_code}</td>
                    <td>{formatDate(error.occurred_at)}</td>
                    <td>{error.file}</td>
                    <td><Link to="/">Show</Link></td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination>
              <PaginationItem disabled={errors.page === 1}>
                <PaginationLink first tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?page=1`} />
              </PaginationItem>
              <PaginationItem disabled={errors.page === 1}>
                <PaginationLink previous tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?page=${errors.page - 1}`} />
              </PaginationItem>
              <PaginationItem disabled={errors.page === Math.ceil(errors.count / 10)}>
                <PaginationLink next tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?page=${errors.page + 1}`} />
              </PaginationItem>
              <PaginationItem disabled={errors.page === Math.ceil(errors.count / 10)}>
                <PaginationLink last tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?page=${Math.ceil(errors.count / 10)}`} />
              </PaginationItem>
            </Pagination>
          </>
        }
      </Col>
    </Row>
  )
}