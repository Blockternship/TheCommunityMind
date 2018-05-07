/**
 * Created by will on 14/11/17.
 */
import gql from 'graphql-tag';

const USER_QUERY = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      id
      username
      followsCount
      followersCount
      followedByCurrentUser
    }
  }
`;
export default USER_QUERY