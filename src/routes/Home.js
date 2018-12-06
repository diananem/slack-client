import React from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const Home = ({ data: { getAllUsers = [] } }) =>
  getAllUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

const getAllUsersQuery = gql`
  {
    getAllUsers {
      id
      email
    }
  }
`;

export default graphql(getAllUsersQuery)(Home);