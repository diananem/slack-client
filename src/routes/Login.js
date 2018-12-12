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

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  onSubmit = loginMutation => async () => {
    this.setState({
      errors: []
    });
    const { email, password } = this.state;
    const response = await loginMutation({
      variables: { email, password }
    });
    const { success, token, refreshToken, errors } = response.data.login;
    if (success) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/");
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
    const { email, password, errors } = this.state;

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Mutation mutation={LOGIN_MUTATION}>
          {(login, { loading }) => {
            return (
              <Form loading={loading} onSubmit={this.onSubmit(login)}>
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

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export default Login;
