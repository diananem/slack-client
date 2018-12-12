import React, { Component } from 'react';
import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react';

import { graphql } from 'react-apollo';
import gql from "graphql-tag";

export class CreateTeam extends Component {
  state = {
    name: '',
    nameError: '',
  }

  onSubmit = async () => {
    this.setState({
      nameError: '',
    })
    const { name } = this.state;
    const response = await this.props.mutate({
      variables: { name },
    })
    const { success, errors } = response.data.createTeam;
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
    const { name, nameError } = this.state;
    const errorList = [];
    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as='h2'>Create a Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input name="name" onChange={this.handleChange} value={name} placeholder="name" fluid />
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

const createTeamMutation = gql`
mutation($name: String!) {
createTeam(name: $name)  {
  success
  errors {
    path
    message
  }
 }
}
`;

export default graphql(createTeamMutation)(CreateTeam);
