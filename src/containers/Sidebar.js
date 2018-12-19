import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import findIndex from "lodash/findIndex";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";

const Sidebar = ({ currentTeamId }) => (
  <Query query={ALL_TEAMS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return "Loading..";
      }
      if (error) return `Error! ${error.message}`;

      const { allTeams } = data;

      const teamIdx = currentTeamId
        ? findIndex(allTeams, ["id", parseInt(currentTeamId)])
        : 0;

      const team = allTeams[teamIdx];
      let username = "";
      try {
        const token = localStorage.getItem("token");
        const { user } = decode(token);
        // eslint-disable-next-line prefer-destructuring
        username = user.username;
      } catch (err) {}

      return [
        <Teams
          key="teams-sidebar"
          teams={allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />,
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          userName={username}
          channels={team.channels}
          users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        />
      ];
    }}
  </Query>
);

const ALL_TEAMS_QUERY = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default Sidebar;
