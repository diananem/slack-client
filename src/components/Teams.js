import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;
const TeamList = styled.ul`
  list-style: none;
  padding-left: 0px;
  width: 100%;
`;
const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10px;
  &:hover {
    border: thick solid #767676;
  }
`;

const team = ({ id, letter }) => (
  <Link to={`/view-team/${id}`} key={`team-${id}`}>
    <TeamListItem>{letter}</TeamListItem>
  </Link>
);

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
);
