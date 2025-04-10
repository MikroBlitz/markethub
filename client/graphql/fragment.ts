export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        roles {
            id
            name
        }
        is_active
        created_at
        updated_at
        deleted_at
    }
`;

export const roleFragment = gql`
    fragment role on Role {
        id
        name
        guard_name
        created_at
        updated_at
    }
`;
