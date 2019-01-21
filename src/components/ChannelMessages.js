import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

class ChannelMessages extends Component {
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
      <Messages>
        <Comment.Group>
          {messages.map(msg => (
            <Comment key={`${msg.id}-message`}>
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
      </Messages>
    );
  }
}

export default ChannelMessages;
