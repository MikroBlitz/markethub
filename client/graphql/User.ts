import { userFragment } from "~/graphql/Fragment";

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
    query usersPaginate(
        $first: Int!
        $page: Int
        $search: String
        $sort: SortInput
        $filter: [FilterInput]
    ) {
        usersPaginate(
            first: $first
            page: $page
            search: $search
            sort: $sort
            filter: $filter
        ) {
            data {
                ...user
            }
            paginatorInfo {
                currentPage
                lastPage
                perPage
                total
            }
        }
    }
    ${userFragment}
`;

export const upsertUser = gql`
    mutation upsertUser($input: UserInput!) {
        upsertUser(input: $input) {
            ...user
        }
    }
    ${userFragment}
`;

export const deleteUser = gql`
    mutation deleteUser($id: [ID!]) {
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
