import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../containers/Sidebar";
import MessageContainer from "../containers/MessageContainer";
import { ALL_TEAMS_QUERY } from "../queries/ALL_TEAMS_QUERY";

const ViewTeam = ({
  match: {
    params: { team_id, channel_id }
  }
}) => (
  <Query query={ALL_TEAMS_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) {
        return "Loading..";
      }
      if (error) {
        console.error(error);
        return;
      }

      const { teams, username } = data.getUser;
      if (!teams.length) {
        return <Redirect to="/create-team" />;
      }

      const teamIdInteger = parseInt(team_id, 10);

      const teamIdx = teamIdInteger
        ? findIndex(teams, ["id", teamIdInteger])
        : 0;
      const team = teamIdx === -1 ? teams[0] : teams[teamIdx];
      console.log(team.directMessageMembers);
      const channelIdInteger = parseInt(channel_id, 10);

      const channelIdx = channelIdInteger
        ? findIndex(team.channels, ["id", channelIdInteger])
        : 0;
      const channel =
        channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];
      return (
        <Mutation mutation={CREATE_MESSAGE_MUTATION}>
          {(createMessage, { error }) => {
            if (error) {
              console.log(error);
              return;
            }
            return (
              <AppLayout>
                <Sidebar
                  teams={teams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase()
                  }))}
                  team={team}
                  username={username}
                />
                <Header channelName={channel.name} />
                <MessageContainer channelId={channel.id} />
                <SendMessage
                  placeholder={channel.name}
                  onSubmit={async text => {
                    await createMessage({
                      variables: {
                        text,
                        channel_id: channel.id
                      }
                    });
                  }}
                />
              </AppLayout>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

const CREATE_MESSAGE_MUTATION = gql`
  mutation($channel_id: Int!, $text: String!) {
    createMessage(channel_id: $channel_id, text: $text)
  }
`;

export default ViewTeam;
