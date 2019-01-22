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
            <DirectMessages key={teamId} directMessages={directMessages} />
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

export default DirectMessageContainer;
