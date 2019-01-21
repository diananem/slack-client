import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import SendMessage from "../components/SendMessage";
import Sidebar from "../containers/Sidebar";
import DirectMessageContainer from "../containers/DirectMessageContainer";
import { ALL_TEAMS_QUERY } from "../queries/ALL_TEAMS_QUERY";

const ViewDirectMessages = ({
  match: {
    params: { team_id, user_id }
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

      return (
        <Mutation mutation={CREATE_DIRECT_MESSAGE_MUTATION}>
          {(createDirectMessage, { loading, error }) => (
            <>
              <AppLayout>
                <Sidebar
                  teams={teams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase()
                  }))}
                  team={team}
                  username={username}
                />
                <Header channelName={"Some username"} />
                <DirectMessageContainer teamId={team_id} userId={user_id} />
                <SendMessage
                  onSubmit={async text => {
                    const response = await createDirectMessage({
                      variables: {
                        text,
                        receiver_id: Number(user_id),
                        team_id: Number(team_id)
                      }
                    });
                    console.log(response);
                  }}
                  placeholder={user_id}
                />
              </AppLayout>
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </>
          )}
        </Mutation>
      );
    }}
  </Query>
);

const CREATE_DIRECT_MESSAGE_MUTATION = gql`
  mutation($receiver_id: Int!, $text: String!, $team_id: Int!) {
    createDirectMessage(
      receiver_id: $receiver_id
      text: $text
      team_id: $team_id
    )
  }
`;

export default ViewDirectMessages;
