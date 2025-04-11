export const authMe = gql`
    query me {
        me {
            id
            name
            email
            is_admin
            roles {
                name
            }
        }
    }
`;

export const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                name
                email
                is_admin
                roles {
                    name
                }
            }
        }
    }
`;

export const logoutMutation = gql`
    mutation {
        logout {
            message
        }
    }
`;
