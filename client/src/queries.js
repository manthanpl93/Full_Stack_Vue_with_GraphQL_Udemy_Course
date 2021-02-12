import { gql } from 'apollo-boost';

/* Get Posts */
export const GET_POSTS = gql`
query {
  getPosts{
    _id
    title
    imageUrl
  }
}
`;