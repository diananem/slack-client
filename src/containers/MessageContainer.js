import React from "react";
import { Comment } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Messages from "../components/Messages";

const MessageContainer = ({ channelId }) => {
  return (
    <Query query={MESSAGES_QUERY} variables={{ channelId }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        const { messages } = data;
        return (
          <Messages>
            <Comment.Group>
              {messages.map(msg => (
                <Comment key={msg.id}>
                  <Comment.Content>
                    <Comment.Author as="a">{msg.user.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {new Date(parseInt(msg.created_at, 10)).toString()}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{msg.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))}
              {/* {JSON.stringify(data.messages)} */}
            </Comment.Group>
          </Messages>
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

export default MessageContainer;
