import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { telegramIntegrationActions } from '../../redux';
import { REQUEST } from '../../request.constants';
import { RoutingConfig } from '../../Routes';
import { IntegrationApi } from '../../services';
import { ProjectAuthorizationService } from '../../util';

export const TelegramIntegrationsRow = ({project, integrations, location, user}) => {
  const [status, setStatus] = useState(REQUEST.PENDING);
  const urlParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const requestIntegrations = () => {
    IntegrationApi.getTelegramIntegrations(project.id, urlParams.get("telegram_integrations_page") || 1)
    .then(response => response.data)
    .then(json => {
      dispatch(telegramIntegrationActions.receiveIntegrationList(json.payload));
      setStatus(REQUEST.SUCCESS);
    })
    .catch(error => {
      setStatus(REQUEST.ERROR);
    })
  }

  useEffect(() => {
    requestIntegrations();
  }, [urlParams.get("telegram_integrations_page")]);
  
  return (
    <Row>
      <Col>
        <div className="mb-4">
          <h2>Telegram integrations</h2>
          <hr className="solid" />
        </div>
        {status === REQUEST.PENDING && <p>Loading...</p> }
        {status === REQUEST.ERROR && <p>Failed to load errors.</p> }
        {status === REQUEST.SUCCESS &&
        <>
        { ProjectAuthorizationService.isProjectOwner(user, project) && <Link className="btn btn-primary mb-4" to={RoutingConfig.newTelegramIntegration.replace(":id", project.id)}>Create new telegram integration</Link>}
        { integrations.count === 0 ? <p>There are no integrations to display.</p> :
          <>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bot ID</th>
                  <th>Chat ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {integrations.items.map((integration, index) => 
                  <tr key={integration.id}>
                    <th scope="row">{index + 1 + (integrations.page - 1) * 10}</th>
                    <td>{integration.bot_id}</td>
                    <td>{integration.chat_id}</td>
                    <td><Link to={RoutingConfig.telegramintegration.replace(":id", project.id).replace(":integration_id", integration.id)}>Show</Link></td>
                  </tr>
                )}
              </tbody>
            </Table>
            {integrations.count > 10 &&
              <Pagination>
                <PaginationItem disabled={integrations.page === 1}>
                  <PaginationLink first tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?telegram_integrations_page=1`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === 1}>
                  <PaginationLink previous tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?telegram_integrations_page=${integrations.page - 1}`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === Math.ceil(integrations.count / 10)}>
                  <PaginationLink next tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?telegram_integrations_page=${integrations.page + 1}`} />
                </PaginationItem>
                <PaginationItem disabled={integrations.page === Math.ceil(integrations.count / 10)}>
                  <PaginationLink last tag={Link} to={RoutingConfig.projectPage.replace(":id", project.id) + `?telegram_integrations_page=${Math.ceil(integrations.count / 10)}`} />
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