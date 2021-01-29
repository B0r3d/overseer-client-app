import React from 'react'
import { Container } from 'reactstrap';
import { ProjectMemberInvitationsRow } from './ProjectMemberInvitationsRow';
import { ProjectTitleRow } from './ProjectTitleRow'
import { ProjectMembersRow } from './ProjectMembersRow';
import { ProjectApiKeysRow } from './ProjectApiKeysRow';
import { ProjectErrorsRow } from './ProjectErrorsRow';

export const ProjectCard = ({ project, user, errors, location }) => {
  return(
    <Container className="pt-4">
      <ProjectTitleRow project={project} user={user} />
      <ProjectMemberInvitationsRow project={project} user={user} />
      <ProjectMembersRow project={project} user={user} />
      <ProjectApiKeysRow project={project} user={user} />
      <ProjectErrorsRow project={project} errors={errors} location={location} />
    </Container>
  );
}