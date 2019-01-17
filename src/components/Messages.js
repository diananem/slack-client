import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

import styled from "styled-components";

const MessagesList = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

class Messages extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.subscribeToNewMessages();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <MessagesList>
        <Comment.Group>
          {messages.map(msg => (
            <Comment key={msg.id}>
              <Comment.Content>
                <Comment.Author as="a">{msg.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(parseInt(msg.created_at, 10)).toString()}</div>
                </Comment.Metadata>
                <Comment.Text>{msg.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </MessagesList>
    );
  }
}

export default Messages;
