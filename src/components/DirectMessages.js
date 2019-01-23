import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

class DirectMessages extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.subscribeToNewDirectMessages();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  render() {
    const { directMessages } = this.props;
    console.log(directMessages);
    return (
      <Messages>
        <Comment.Group>
          {directMessages.map(msg => (
            <Comment key={`${msg.id}-direct-message`}>
              <Comment.Content>
                <Comment.Author as="a">{msg.sender.username}</Comment.Author>
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

export default DirectMessages;
