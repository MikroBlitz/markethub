export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        role
        is_active
        created_at
        updated_at
        deleted_at
    }
`;
