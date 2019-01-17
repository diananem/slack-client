import React, { Component } from "react";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message
} from "semantic-ui-react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { isFieldHasError } from "../utils/validation";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: []
  };
  onSubmit = registerMutation => async () => {
    this.setState({
      errors: []
    });
    const { username, email, password } = this.state;
    const response = await registerMutation({
      variables: { username, email, password }
    });

    const { success, errors, token } = response.data.register;
    if (success) {
      localStorage.setItem("token", token);
      this.props.history.push("/view-team");
    } else {
      this.setState({
        errors
      });
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { username, email, password, errors } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Mutation mutation={REGISTER_MUTATION}>
          {(register, { loading }) => {
            return (
              <Form loading={loading} onSubmit={this.onSubmit(register)}>
                <Form.Field
                  error={isFieldHasError({ errors, fieldName: "username" })}
                >
                  <Input
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    placeholder="username"
                    fluid
                  />
                </Form.Field>
                <Form.Field
                  error={isFieldHasError({ errors, fieldName: "email" })}
                >
                  <Input
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    placeholder="email"
                    fluid
                  />
                </Form.Field>
                <Form.Field
                  error={isFieldHasError({ errors, fieldName: "password" })}
                >
                  <Input
                    name="password"
                    onChange={this.handleChange}
                    value={password}
                    type="password"
                    placeholder="password"
                    fluid
                  />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            );
          }}
        </Mutation>
        {errors.length !== 0 && (
          <Message
            error
            header="There was some errors with your submission"
            list={errors.map(({ message }) => message)}
          />
        )}
      </Container>
    );
  }
}

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      success
      token
      errors {
        path
        message
      }
    }
  }
`;

export default Register;
