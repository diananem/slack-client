import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;
const SideBarList = styled.ul`
  list-style: none;
  padding-left: 0px;
  width: 100%;
`;

const paddingLeft = "padding-left: 10px";

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;
const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background-color: #3e313c;
  }
`;

const ToRight = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>● </Green> : "○ ");

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>{`# ${name}`}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble />
    {name}
  </SideBarListItem>
);

export default ({
  teamId,
  teamName,
  userName,
  channels,
  users,
  addChannel,
  invitePeople
}) => (
  <ChannelWrapper>
    <ToRight>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {userName}
    </ToRight>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels <Icon onClick={addChannel} name="add circle" />
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
    <div>
      <a href="#invite-people" onClick={invitePeople}>
        + Invite People
      </a>
    </div>
  </ChannelWrapper>
);
