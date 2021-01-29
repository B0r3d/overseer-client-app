import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Input, Label, Button, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { errorActions } from '../../redux/actions/error.actions';
import { REQUEST } from '../../request.constants';
import { RoutingConfig } from '../../Routes';
import { ProjectApi } from '../../services';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from './style.module.css';

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
  const history = useHistory();
  const criteria = {
    search: urlParams.get("search") || "",
    date_from: urlParams.get("date_from") || "",
    date_to: urlParams.get("date_to") || "",
  }
  const { register, handleSubmit} = useForm({
    defaultValues: {
      search: criteria.search,
      date_from: urlParams.get("date_from") || "",
      date_to: urlParams.get("date_to") || ""
    }
  });
  

  const requestErrors = () => {
    const requestCriteria = {...criteria};

    if(criteria.date_from) {
      const date = new Date(criteria.date_from + "T00:00");
      requestCriteria.date_from = date.getTime() / 1000;
    }

    if(criteria.date_to) {
      const date = new Date(criteria.date_to + "T00:00");
      requestCriteria.date_to = date.getTime() / 1000;
    }
    
    ProjectApi.getErrors(project.id, {
      page: urlParams.get("page") || 1,
      ...requestCriteria,
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

  const requestChartData = () => {
    const requestCriteria = {...criteria};

    if(criteria.date_from) {
      const date = new Date(criteria.date_from + "T00:00");
      requestCriteria.date_from = date.getTime() / 1000;
    }

    if(criteria.date_to) {
      const date = new Date(criteria.date_to + "T00:00");
      requestCriteria.date_to = date.getTime() / 1000;
    }
    
    ProjectApi.getChartData(project.id, {
      page: urlParams.get("page") || 1,
      ...requestCriteria,
    })
    .then(response => response.data)
    .then(json => {
      setStatus(REQUEST.SUCCESS);
      dispatch(errorActions.receiveChartData(json.payload));
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    });
  }

  useEffect(() => {
    requestErrors();
    requestChartData();
  }, [urlParams.get("page"), urlParams.get("search"), urlParams.get("date_from"), urlParams.get("date_to")]);

  const onSubmit = data => {    
    history.replace(`${RoutingConfig.projectPage.replace(":id", project.id)}?page=1&search=${data.search}&date_from=${data.date_from}&date_to=${data.date_to}`);
  }
  function formatXAxis(tickItem) {
    const date = new Date(tickItem);
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = '' + date.getFullYear();
        
    if(month.length < 2) 
      month = '0' + month;
    if(day.length < 2) 
      day = '0' + day;

    return `${day}.${month}.${year}`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className={styles['custom-tooltip']}>
          <p className={styles['label']}>{`Exceptions count occured on ${formatXAxis(label)}: `}<strong>{payload[0].value}</strong></p>
        </div>
      );
    }
  
    return null;
  };

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
            {errors.chartData &&
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={errors.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatXAxis} />
                  <YAxis allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line name="Error count" type="monotone" dataKey="error_count" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>}
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
                    <td><Link to={RoutingConfig.errorDetails.replace(":id", project.id).replace(":error_id", error.id)}>Show</Link></td>
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