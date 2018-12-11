import React, { Component } from 'react';
import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react';

import { graphql } from 'react-apollo';
import gql from "graphql-tag";

export class Login extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  }

  onSubmit = async () => {
    this.setState({
      emailError: '',
      passwordError: '',
    })
    const { email, password } = this.state;
    const responce = await this.props.mutate({
      variables: { email, password },
    })
    const { success, token, refreshToken, errors } = responce.data.login;
    if (success) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
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
    const { email, password, emailError, passwordError } = this.state;
    const errorList = [];
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Form>
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

const loginMutation = gql`
mutation($email: String!, $password: String!) {
login(email: $email, password: $password)  {
  success
  token
  refreshToken
  errors {
    path
    message
  }
 }
}
`;

export default graphql(loginMutation)(Login);
