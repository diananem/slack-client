import React from "react";
import { Form, Button, Input, Modal } from "semantic-ui-react";
import Downshift from "downshift";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";

// const items = [
//   { value: "apple" },
//   { value: "pear" },
//   { value: "orange" },
//   { value: "grape" },
//   { value: "banana" }
// ];

const DirectMessageModal = ({ history, open, onClose, teamId }) => (
  <Query
    query={GET_TEAM_MEMBERS_QUERY}
    variables={{ teamId }}
    key={teamId}
    // fetchPolicy="network-only"
  >
    {({ loading, error, data }) => {
      if (error) return `Error!: ${error}`;
      const { getTeamMembers } = data;

      console.log(teamId);
      return (
        <Modal open={open} onClose={onClose}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                {!loading && (
                  <Downshift
                    onChange={selection => {
                      history.push(`/view-team/user/${teamId}/${selection.id}`);
                      onClose();
                    }}
                    itemToString={item => (item ? item.username : "")}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getLabelProps,
                      getMenuProps,
                      isOpen,
                      inputValue,
                      highlightedIndex,
                      selectedItem
                    }) => (
                      <div>
                        <label {...getLabelProps()}>Enter a fruit</label>
                        <Input
                          {...getInputProps({ placeholder: "Search users" })}
                          fluid
                        />
                        <ul {...getMenuProps()}>
                          {isOpen
                            ? getTeamMembers
                                .filter(
                                  item =>
                                    !inputValue ||
                                    item.username.includes(inputValue)
                                )
                                .map((item, index) => (
                                  <li
                                    {...getItemProps({
                                      key: item.username,
                                      index,
                                      item,
                                      style: {
                                        backgroundColor:
                                          highlightedIndex === index
                                            ? "lightgray"
                                            : "white",
                                        fontWeight:
                                          selectedItem === item
                                            ? "bold"
                                            : "normal"
                                      }
                                    })}
                                  >
                                    {item.username}
                                  </li>
                                ))
                            : null}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                )}
              </Form.Field>
              <Form.Group widths="equal">
                <Button onClick={onClose} fluid>
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      );
    }}
  </Query>
);

const GET_TEAM_MEMBERS_QUERY = gql`
  query($teamId: Int!) {
    getTeamMembers(team_id: $teamId) {
      id
      username
    }
  }
`;

export default withRouter(DirectMessageModal);
