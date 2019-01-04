import React from "react";
import { Query } from "react-apollo";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

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
      if (error) {
        console.error(error);
        return;
      }
      const { allTeams, inviteTeams } = data;

      const teams = [...allTeams, ...inviteTeams];

      if (!teams.length) {
        return <Redirect to="/create-team" />;
      }

      const teamIdInteger = parseInt(team_id, 10);

      const teamIdx = teamIdInteger
        ? findIndex(teams, ["id", teamIdInteger])
        : 0;
      const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
      const channelIdInteger = parseInt(channel_id, 10);

      const channelIdx = channelIdInteger
        ? findIndex(team.channels, ["id", channelIdInteger])
        : 0;
      const channel =
        channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];
      return (
        <AppLayout>
          <Sidebar
            teams={teams.map(t => ({
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
