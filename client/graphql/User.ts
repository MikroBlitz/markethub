// export const users = gql`
//     query users($limit: Int) {
//         users(limit: $limit) {
//             id
//             name
//             email
//             password
//             role
//         }
//     }
// `;

export const usersPaginate = gql`
    query usersPaginate($first: Int!, $page: Int) {
        usersPaginate(first: $first, page: $page) {
            data {
                id
                name
                email
                password
                role
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
`;

export const upsertUser = gql`
    mutation upsertUser($user: UserInput!) {
        upsertUser(input: $user) {
            id
            name
            email
            password
            role
        }
    }
`;

export const deleteUser = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export const restoreUser = gql`
    mutation restoreUser($id: ID!) {
        restoreUser(id: $id) {
            id
        }
    }
`;
