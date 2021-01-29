import React from 'react'
import { Container } from 'reactstrap';
import { ProjectMemberInvitationsRow } from './ProjectMemberInvitationsRow';
import { ProjectTitleRow } from './ProjectTitleRow'
import { ProjectMembersRow } from './ProjectMembersRow';
import { ProjectApiKeysRow } from './ProjectApiKeysRow';

export const ProjectCard = ({ project, user }) => {
  return(
    <Container className="pt-4">
      <ProjectTitleRow project={project} user={user} />
      <ProjectMemberInvitationsRow project={project} user={user} />
      <ProjectMembersRow project={project} user={user} />
      <ProjectApiKeysRow project={project} user={user} />
    </Container>
  );
}