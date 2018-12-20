import React, { Component } from "react";
import { Query } from "react-apollo";
import findIndex from "lodash/findIndex";
import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";
import { ALL_TEAMS_QUERY } from "../queries/ALL_TEAMS_QUERY";

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
    const { currentTeamId } = this.props;
    return (
      <Query query={ALL_TEAMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading..";
          }
          if (error) return `Error! ${error.message}`;

          const { allTeams } = data;

          const teamIdx = currentTeamId
            ? findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
            : 0;
          const team = allTeams[teamIdx];
          let username = "";
          try {
            const token = localStorage.getItem("token");
            const { user } = decode(token);
            username = user.username;
          } catch (err) {}

          return [
            <Teams
              key="teams-sidebar"
              teams={allTeams.map(t => ({
                id: t.id,
                letter: t.name.charAt(0).toUpperCase()
              }))}
            />,
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
        }}
      </Query>
    );
  }
}

export default Sidebar;
