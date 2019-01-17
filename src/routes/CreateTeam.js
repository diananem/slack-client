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

export class CreateTeam extends Component {
  state = {
    name: "",
    errors: []
  };

  onSubmit = createTeamMutation => async () => {
    this.setState({
      errors: []
    });
    const { name } = this.state;
    try {
      const {
        data: {
          createTeam: { success, errors, team }
        }
      } = await createTeamMutation({
        variables: { name }
      });
      if (success) {
        this.props.history.push(`/view-team/${team.id}`);
      } else {
        this.setState({
          errors
        });
      }
    } catch (err) {
      console.error(err);
      this.props.history.push("/login");
      return;
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { name, errors } = this.state;
    return (
      <Container text>
        <Header as="h2">Create a Team</Header>
        <Mutation mutation={CREATE_TEAM_MUTATION}>
          {(createTeam, { loading }) => {
            return (
              <Form loading={loading} onSubmit={this.onSubmit(createTeam)}>
                <Form.Field
                  error={isFieldHasError({ errors, fieldName: "name" })}
                >
                  <Input
                    name="name"
                    onChange={this.handleChange}
                    value={name}
                    placeholder="name"
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

const CREATE_TEAM_MUTATION = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      success
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default CreateTeam;
