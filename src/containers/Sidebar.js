import React, { Component } from "react";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";

class Sidebar extends Component {
  state = {
    openAddChannelModal: false
  };
  handleCloseAddChannelModal = () => {
    this.setState({
      openAddChannelModal: false
    });
  };
  handleAddChannelModal = () => {
    this.setState({
      openAddChannelModal: true
    });
  };
  render() {
    const { teams, team } = this.props;

    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {}

    return [
      <Teams key="teams-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamId={team.id}
        teamName={team.name}
        userName={username}
        channels={team.channels}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        addChannel={this.handleAddChannelModal}
      />,
      <AddChannelModal
        teamId={team.id}
        key="add-channel-modal"
        open={this.state.openAddChannelModal}
        onClose={this.handleCloseAddChannelModal}
      />
    ];
  }
}

export default Sidebar;
