import React from "react";
import styled from "styled-components";
import { Form, Input } from "semantic-ui-react";
import { Formik } from "formik";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({ placeholder, onSubmit }) => (
  <SendMessageWrapper>
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!values.message || !values.message.trim()) {
          setSubmitting(false);
          return;
        }
        console.log(values.message);
        await onSubmit(values.message);

        resetForm(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              fluid
              placeholder={`Message #${placeholder}`}
            />
          </Form.Field>
        </Form>
      )}
    </Formik>
  </SendMessageWrapper>
);

export default SendMessage;
