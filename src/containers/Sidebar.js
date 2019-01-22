import React, { Component } from "react";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";
import DirectMessageModal from "../components/DirectMessageModal";

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  };

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openDirectMessageModal: !prevState.openDirectMessageModal
    }));
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
    const { teams, team, username } = this.props;
    const {
      openAddChannelModal,
      openInvitePeopleModal,
      openDirectMessageModal
    } = this.state;
    return [
      <Teams key="teams-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        isOwner={team.admin}
        teamId={team.id}
        teamName={team.name}
        userName={username}
        channels={team.channels}
        users={[{ id: 1, name: "slackbot" }, { id: 2, name: "user1" }]}
        addChannel={this.toggleAddChannelModal}
        addDirectMessage={this.toggleDirectMessageModal}
        invitePeople={this.toggleInvitePeopleModal}
      />,
      <DirectMessageModal
        teamId={team.id}
        key="direct-message-modal"
        open={openDirectMessageModal}
        onClose={this.toggleDirectMessageModal}
      />,
      <AddChannelModal
        teamId={team.id}
        key="add-channel-modal"
        open={openAddChannelModal}
        onClose={this.toggleAddChannelModal}
      />,
      <InvitePeopleModal
        teamId={team.id}
        key="invite-people-modal"
        open={openInvitePeopleModal}
        onClose={this.toggleInvitePeopleModal}
      />
    ];
  }
}

export default Sidebar;
