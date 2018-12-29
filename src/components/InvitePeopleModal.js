import React from "react";
import { Form, Button, Input, Modal } from "semantic-ui-react";
import { Formik } from "formik";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import formatErrors from "../utils/formatErrors";

const InvitePeopleModal = ({ open, onClose, teamId }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Mutation mutation={ADD_TEAM_MEMBER_MUTATION}>
        {addTeamMember => {
          return (
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const response = await addTeamMember({
                  variables: { email: values.email, team_id: Number(teamId) }
                });
                const { success, errors } = response.data.addTeamMember;
                if (success) {
                  onClose();
                  setSubmitting(false);
                } else {
                  setSubmitting(false);
                  setErrors(formatErrors(errors));
                }
              }}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form>
                  <Form.Field>
                    <Input
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      fluid
                      placeholder="user's email"
                    />
                  </Form.Field>
                  {errors.email && touched.email ? errors.email : null}

                  <Form.Group widths="equal">
                    <Button
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      type="submit"
                      fluid
                    >
                      Add User
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

const ADD_TEAM_MEMBER_MUTATION = gql`
  mutation($email: String!, $team_id: Int!) {
    addTeamMember(email: $email, team_id: $team_id) {
      success
      errors {
        path
        message
      }
    }
  }
`;

export default InvitePeopleModal;
