import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Container, Header, Input, Button } from 'semantic-ui-react';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }
  onSubmit = async () => {
    const responce = await this.props.mutate({
      variables: this.state
    })
    console.log(responce)
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input name="username" onChange={this.handleChange} value={username} placeholder="username" fluid />
        <Input name="email" onChange={this.handleChange} value={email} placeholder="email" fluid />
        <Input name="password" onChange={this.handleChange} value={password} type="password" placeholder="password" fluid />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    )
  }
}

const registerMutation = gql`
mutation( $username: String!, $email: String!, $password: String!) {
register(username: $username, email: $email, password: $password) 
}
`

export default graphql(registerMutation)(Register);
