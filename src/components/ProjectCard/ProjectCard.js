import React from 'react'
import { Container } from 'reactstrap';
import { ProjectMemberInvitationsRow } from './ProjectMemberInvitationsRow';
import { ProjectTitleRow } from './ProjectTitleRow'
import { ProjectMembersRow } from './ProjectMembersRow';
import { ProjectApiKeysRow } from './ProjectApiKeysRow';
import { ProjectErrorsRow } from './ProjectErrorsRow';
import { WebhookIntegrationsRow } from './WebhookIntegrationsRow';

export const ProjectCard = ({ project, user, errors, location, webhookIntegrations }) => {
  return(
    <Container className="pt-4">
      <ProjectTitleRow project={project} user={user} />
      <ProjectMemberInvitationsRow project={project} user={user} />
      <ProjectMembersRow project={project} user={user} />
      <ProjectApiKeysRow project={project} user={user} />
      <ProjectErrorsRow project={project} errors={errors} location={location} />
      <WebhookIntegrationsRow location={location} project={project} integrations={webhookIntegrations} user={user} />
    </Container>
  );
}