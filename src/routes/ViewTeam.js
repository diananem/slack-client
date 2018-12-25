import React from "react";
import { Query } from "react-apollo";
import findIndex from "lodash/findIndex";

import Messages from "../components/Messages";
import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../containers/Sidebar";
import { ALL_TEAMS_QUERY } from "../queries/ALL_TEAMS_QUERY";

const ViewTeam = ({
  match: {
    params: { team_id, channel_id }
  }
}) => (
  <Query query={ALL_TEAMS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return "Loading..";
      }
      if (error) return `Error! ${error.message}`;

      const { allTeams } = data;
      const teamIdx = team_id
        ? findIndex(allTeams, ["id", parseInt(team_id, 10)])
        : 0;
      const team = allTeams[teamIdx];
      const channelIdx = channel_id
        ? findIndex(team.channels, ["id", parseInt(channel_id, 10)])
        : 0;
      const channel = team.channels[channelIdx];
      return (
        <AppLayout>
          <Sidebar
            teams={allTeams.map(t => ({
              id: t.id,
              letter: t.name.charAt(0).toUpperCase()
            }))}
            team={team}
          />
          <Header channelName={channel.name} />
          <Messages channelId={channel.id}>
            <ul className="message-list">
              <li />
              <li />
            </ul>
          </Messages>
          <SendMessage channelName={channel.name} />
        </AppLayout>
      );
    }}
  </Query>
);

export default ViewTeam;
