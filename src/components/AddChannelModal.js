import React from "react";
import { Form, Button, Input, Modal } from "semantic-ui-react";
import { Formik } from "formik";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
                  variables: { team_id: Number(teamId), name: values.name }
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
    createChannel(team_id: $team_id, name: $name)
  }
`;

export default AddChannelModal;
