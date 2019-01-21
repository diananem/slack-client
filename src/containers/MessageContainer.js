import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ChannelMessages from "../components/ChannelMessages";

const MessageContainer = ({ channelId }) => {
  return (
    <Query
      query={MESSAGES_QUERY}
      variables={{ channelId }}
      key={channelId}
      fetchPolicy="network-only"
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        const { messages } = data;
        return (
          <>
            <ChannelMessages
              messages={messages}
              key={channelId}
              subscribeToNewMessages={() =>
                subscribeToMore({
                  document: ON_MESSAGE_ADDED,
                  variables: { channelId },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newFeedItem = subscriptionData.data.messageAdded;

                    return Object.assign({}, prev, {
                      messages: [...prev.messages, newFeedItem]
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

const MESSAGES_QUERY = gql`
  query($channelId: Int!) {
    messages(channel_id: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

const ON_MESSAGE_ADDED = gql`
  subscription($channelId: Int!) {
    messageAdded(channel_id: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default MessageContainer;
