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
  <Query
    query={DIRECT_MESSAGE_AND_USER_QUERY}
    key={user_id}
    variables={{ user_id: Number(user_id) }}
    fetchPolicy="network-only"
  >
    {({ loading, error, data }) => {
      if (loading) {
        return "Loading..";
      }

      if (error) {
        console.error(error);
        return;
      }

      const { teams, username } = data.getUser;
      const { getDirectMessageUser } = data;
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
                <Header channelName={getDirectMessageUser.username} />
                <DirectMessageContainer teamId={team.id} userId={user_id} />
                <SendMessage
                  onSubmit={async text => {
                    await createDirectMessage({
                      variables: {
                        text,
                        receiver_id: Number(user_id),
                        team_id: Number(team_id)
                      },
                      update: store => {
                        const data = store.readQuery({
                          query: ALL_TEAMS_QUERY
                        });
                        const teamIndex = findIndex(data.getUser.teams, [
                          "id",
                          team.id
                        ]);
                        const teamDirectMessageMembers =
                          data.getUser.teams[teamIndex].directMessageMembers;
                        const notAtTheList = teamDirectMessageMembers.every(
                          member => member.id !== parseInt(user_id, 10)
                        );

                        if (notAtTheList) {
                          teamDirectMessageMembers.push({
                            __typename: "User",
                            id: user_id,
                            username: getDirectMessageUser.username
                          });
                          store.writeQuery({ query: ALL_TEAMS_QUERY, data });
                        }
                      }
                    });
                  }}
                  placeholder={getDirectMessageUser.username}
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

const DIRECT_MESSAGE_AND_USER_QUERY = gql`
  query($user_id: Int!) {
    getDirectMessageUser(user_id: $user_id) {
      id
      username
    }
    getUser {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

export default ViewDirectMessages;
