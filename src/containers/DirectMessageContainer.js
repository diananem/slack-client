import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import DirectMessages from "../components/DirectMessages";

const DirectMessageContainer = ({ teamId, userId }) => {
  return (
    <Query
      query={DIRECT_MESSAGES_QUERY}
      variables={{ teamId: Number(teamId), userId: Number(userId) }}
      key={teamId}
      fetchPolicy="network-only"
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        const { directMessages } = data;
        return (
          <>
            <DirectMessages
              key={teamId}
              directMessages={directMessages}
              subscribeToNewDirectMessages={() =>
                subscribeToMore({
                  document: ON_DIRECT_MESSAGE_ADDED,
                  variables: { teamId: Number(teamId), userId: Number(userId) },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newFeedItem =
                      subscriptionData.data.directMessageAdded;

                    return Object.assign({}, prev, {
                      directMessages: [...prev.directMessages, newFeedItem]
                    });
                  }
                })
              }
            />
          </>
        );
      }}
    </Query>
  );
};

const DIRECT_MESSAGES_QUERY = gql`
  query($teamId: Int!, $userId: Int!) {
    directMessages(team_id: $teamId, other_user_id: $userId) {
      id
      text
      sender {
        username
      }
      created_at
    }
  }
`;

const ON_DIRECT_MESSAGE_ADDED = gql`
  subscription($teamId: Int!, $userId: Int!) {
    directMessageAdded(team_id: $teamId, user_id: $userId) {
      id
      text
      sender {
        username
      }
      created_at
    }
  }
`;

export default DirectMessageContainer;
