import React from "react";
import { Form, Button, Input, Modal } from "semantic-ui-react";
import { Formik } from "formik";
import findIndex from "lodash/findIndex";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_TEAMS_QUERY } from "../queries/ALL_TEAMS_QUERY";

const AddChannelModal = ({ open, onClose, teamId }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Mutation mutation={CREATE_CHANNEL_MUTATION}>
        {createChannel => {
          return (
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                await createChannel({
                  variables: { team_id: Number(teamId), name: values.name },
                  update: (store, { data: { createChannel } }) => {
                    const { success, channel } = createChannel;
                    if (!success) {
                      return;
                    }
                    const data = store.readQuery({ query: ALL_TEAMS_QUERY });
                    const teamIdx = findIndex(data.allTeams, ["id", teamId]);
                    data.allTeams[teamIdx].channels.push(channel);
                    store.writeQuery({ query: ALL_TEAMS_QUERY, data });
                  }
                });

                onClose();
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form>
                  <Form.Field>
                    <Input
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      fluid
                      placeholder="channel name"
                    />
                  </Form.Field>
                  <Form.Group widths="equal">
                    <Button
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      type="submit"
                      fluid
                    >
                      Create Channel
                    </Button>
                    <Button disabled={isSubmitting} onClick={onClose} fluid>
                      Cancel
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          );
        }}
      </Mutation>
    </Modal.Content>
  </Modal>
);

const CREATE_CHANNEL_MUTATION = gql`
  mutation($team_id: Int!, $name: String!) {
    createChannel(team_id: $team_id, name: $name) {
      success
      channel {
        id
        name
      }
    }
  }
`;

export default AddChannelModal;
