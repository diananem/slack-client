import gql from "graphql-tag";

export const ALL_TEAMS_QUERY = gql`
  {
    getUser {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;
