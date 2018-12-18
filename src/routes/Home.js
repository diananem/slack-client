import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const Home = () => (
  <Query query={GET_ALL_USERS_QUERY}>
    {({ data: { getAllUsers = [] } }) => {
      return (
        <div>
          {getAllUsers.map(u => (
            <h1 key={u.id}>{u.email}</h1>
          ))}
        </div>
      );
    }}
  </Query>
);

const GET_ALL_USERS_QUERY = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

export default Home;
