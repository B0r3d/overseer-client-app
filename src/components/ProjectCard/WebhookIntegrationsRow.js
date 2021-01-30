import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Col, Row, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { webhookIntegrationActions } from '../../redux';
import { REQUEST } from '../../request.constants';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';
import { ProjectAuthorizationService } from '../../util';

export const WebhookIntegrationsRow = ({project, integrations, location, user}) => {
  const [status, setStatus] = useState(REQUEST.PENDING);
  const urlParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const history = useHistory();

  const requestIntegrations = () => {
    IntegrationApi.getWebhookIntegrations(project.id, urlParams.get("webhook_integrations_page") || 1)
    .then(response => response.data)
    .then(json => {
      dispatch(webhookIntegrationActions.receiveIntegrationList(json.payload));
      setStatus(REQUEST.SUCCESS);
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    })
  }

  useEffect(() => {
    requestIntegrations();
  }, [urlParams.get("webhook_integrations_page")]);

  console.log(integrations);
  
  return (
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Webhook integrations</h2>
          <hr className="solid" />
        </div>
        {status === REQUEST.PENDING && <p>Loading...</p> }
        {status === REQUEST.ERROR && <p>Failed to load errors.</p> }
        {status === REQUEST.SUCCESS &&
        <>
        { ProjectAuthorizationService.isProjectOwner(user, project) && <Link className="btn btn-primary mb-4" to={RoutingConfig.newWebhookIntegration.replace(":id", project.id)}>Create new webhook integration</Link>}
        { integrations.count === 0 ? <p>There are no integrations to display.</p> :
          <>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {integrations.items.map((integration, index) => 
                  <tr key={integration.id}>
                    <th scope="row">{index + 1 + (integrations.page - 1) * 10}</th>
                    <td>{integration.url}</td>
                    <td><Link to={RoutingConfig.webhookintegration.replace(":id", project.id).replace(":integration_id", integration.id)}>Show</Link></td>
                  </tr>
                )}
              </tbody>
            </Table>
            {integrations.count > 10 &&
              <Pagination>
                <PaginationItem disabled={integrations.page === 1}>
                  <PaginationLink first tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?webhook_integrations_page=1`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === 1}>
                  <PaginationLink previous tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?webhook_integrations_page=${integrations.page - 1}`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === Math.ceil(integrations.count / 10)}>
                  <PaginationLink next tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?webhook_integrations_page=${integrations.page + 1}`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === Math.ceil(integrations.count / 10)}>
                  <PaginationLink last tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?webhook_integrations_page=${Math.ceil(integrations.count / 10)}`} />
                </PaginationItem>
              </Pagination>
            }
          </>
          }
        </>
        }
      </Col>
    </Row>
  )
}