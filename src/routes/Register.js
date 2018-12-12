import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react';

export class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  }
  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    })
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    })

    const { success, errors } = response.data.register;
    if (success) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      })
      this.setState(err);
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;
    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input name="username" onChange={this.handleChange} value={username} placeholder="username" fluid />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input name="email" onChange={this.handleChange} value={email} placeholder="email" fluid />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input name="password" onChange={this.handleChange} value={password} type="password" placeholder="password" fluid />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length !== 0 &&
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        }
      </Container>
    )
  }
}

const registerMutation = gql`
mutation( $username: String!, $email: String!, $password: String!) {
register(username: $username, email: $email, password: $password)  {
  success
  errors {
    path
    message
  }
}
}
`;

export default graphql(registerMutation)(Register);
