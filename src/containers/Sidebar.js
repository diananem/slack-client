import React, { Component } from "react";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openAddChannelModal: !prevState.openAddChannelModal
    }));
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openInvitePeopleModal: !prevState.openInvitePeopleModal
    }));
  };
  render() {
    const { teams, team } = this.props;

    let username = "";
    let isOwner = false;
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
      isOwner = user.id === team.owner;
    } catch (err) {}
    return [
      <Teams key="teams-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        isOwner={isOwner}
        teamId={team.id}
        teamName={team.name}
        userName={username}
        channels={team.channels}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        addChannel={this.toggleAddChannelModal}
        invitePeople={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={team.id}
        key="add-channel-modal"
        open={this.state.openAddChannelModal}
        onClose={this.toggleAddChannelModal}
      />,
      <InvitePeopleModal
        teamId={team.id}
        key="invite-people-modal"
        open={this.state.openInvitePeopleModal}
        onClose={this.toggleInvitePeopleModal}
      />
    ];
  }
}

export default Sidebar;
