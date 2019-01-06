import React from "react";
import styled from "styled-components";
import { Form, Input } from "semantic-ui-react";
import { Formik } from "formik";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({ channelName, channelId }) => (
  <SendMessageWrapper>
    <Mutation mutation={CREATE_MESSAGE_MUTATION}>
      {(createMessage, { error }) => {
        if (error) {
          console.log(error);
          return;
        }
        return (
          <Formik
            initialValues={{ message: "" }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (!values.message || !values.message.trim()) {
                setSubmitting(false);
                return;
              }

              await createMessage({
                variables: {
                  channel_id: Number(channelId),
                  text: values.message
                }
              });

              resetForm(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <Input
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    fluid
                    placeholder={`Message #${channelName}`}
                  />
                </Form.Field>
              </Form>
            )}
          </Formik>
        );
      }}
    </Mutation>
  </SendMessageWrapper>
);

const CREATE_MESSAGE_MUTATION = gql`
  mutation($channel_id: Int!, $text: String!) {
    createMessage(channel_id: $channel_id, text: $text)
  }
`;

export default SendMessage;
