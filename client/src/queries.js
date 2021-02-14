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

/* User Queries */
export const GET_CURRENT_USER = gql`
query{
  getCurrentUser{
    _id
    username
    avatar
    joinDate
    favourites{
      _id
      title
      imageUrl
    }
  }
}
`

/* User Mutaions */
export const SIGNIN_USER = gql`
mutation($username: String!, $password: String!){
  signinUser(username: $username,password: $password){
    token
  }
}
`;

export const SIGNUP_USER = gql`
mutation($username: String!, $email: String! ,$password: String!){
  signupUser(username:$username,email:$email,password:$password){
    token
  }
}
`;