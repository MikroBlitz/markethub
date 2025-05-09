export const userFragment = gql`
    fragment user on User {
        id
        name
        email
        password
        is_admin
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
        users {
          id
          name
        }
      	permissions {
          id
          name
        }
        created_at
        updated_at
    }
`;

export const permissionFragment = gql`
    fragment permission on Permission {
            id
            name
            guard_name
            roles {
            id
            name
            }
            created_at
            updated_at
        }
`;
