/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Brand = {
  __typename?: 'Brand';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type BrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

/** A paginated list of Brand items. */
export type BrandPaginator = {
  __typename?: 'BrandPaginator';
  /** A list of Brand items. */
  data: Array<Brand>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Category = {
  __typename?: 'Category';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type CategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

/** A paginated list of Category items. */
export type CategoryPaginator = {
  __typename?: 'CategoryPaginator';
  /** A list of Category items. */
  data: Array<Category>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ConnectBrandRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  upsert?: InputMaybe<BrandInput>;
};

export type ConnectBrandsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<BrandInput>>>;
};

export type ConnectCategoriesRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
};

export type ConnectCategoryRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  upsert?: InputMaybe<CategoryInput>;
};

export type ConnectInventoriesRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<InventoryInput>>>;
};

export type ConnectInventoryRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  upsert?: InputMaybe<InventoryInput>;
};

export type ConnectPermissionRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<PermissionInput>;
};

export type ConnectProductRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  upsert?: InputMaybe<ProductInput>;
};

export type ConnectProductsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<ProductInput>>>;
};

export type ConnectRoleRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<RoleInput>;
};

export type ConnectUserRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<UserInput>;
};

export type FilterInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  qty?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type InventoryInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ConnectProductRelation>;
  qty?: InputMaybe<Scalars['Int']['input']>;
};

/** A paginated list of Inventory items. */
export type InventoryPaginator = {
  __typename?: 'InventoryPaginator';
  /** A list of Inventory items. */
  data: Array<Inventory>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteBrand?: Maybe<Array<Maybe<Brand>>>;
  deleteCategory?: Maybe<Array<Maybe<Category>>>;
  deleteInventory?: Maybe<Array<Maybe<Inventory>>>;
  deletePermission?: Maybe<Array<Maybe<Permission>>>;
  deleteProduct?: Maybe<Array<Maybe<Product>>>;
  deleteRole?: Maybe<Array<Maybe<Role>>>;
  deleteUser?: Maybe<Array<Maybe<User>>>;
  login: AuthPayload;
  logout?: Maybe<LogoutResponse>;
  registerUser: User;
  restoreBrand?: Maybe<Array<Maybe<Brand>>>;
  restoreCategory?: Maybe<Array<Maybe<Category>>>;
  restoreInventory?: Maybe<Array<Maybe<Inventory>>>;
  restoreProduct?: Maybe<Array<Maybe<Product>>>;
  restoreUser: User;
  upsertBrand?: Maybe<Brand>;
  upsertCategory?: Maybe<Category>;
  upsertInventory?: Maybe<Inventory>;
  upsertPermission: Permission;
  upsertProduct?: Maybe<Product>;
  upsertRole: Role;
  upsertUser: User;
};


export type MutationDeleteBrandArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteCategoryArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteInventoryArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeletePermissionArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteProductArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteRoleArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationRestoreBrandArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationRestoreCategoryArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationRestoreInventoryArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationRestoreProductArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationRestoreUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpsertBrandArgs = {
  input: BrandInput;
};


export type MutationUpsertCategoryArgs = {
  input: CategoryInput;
};


export type MutationUpsertInventoryArgs = {
  input: InventoryInput;
};


export type MutationUpsertPermissionArgs = {
  input: PermissionInput;
};


export type MutationUpsertProductArgs = {
  input: ProductInput;
};


export type MutationUpsertRoleArgs = {
  input: RoleInput;
};


export type MutationUpsertUserArgs = {
  input: UserInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles?: Maybe<Array<Maybe<Role>>>;
  updated_at: Scalars['DateTime']['output'];
};

export type PermissionInput = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

/** A paginated list of Permission items. */
export type PermissionPaginator = {
  __typename?: 'PermissionPaginator';
  /** A list of Permission items. */
  data: Array<Permission>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  category?: Maybe<Category>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  inventories?: Maybe<Array<Maybe<Inventory>>>;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ProductInput = {
  brand?: InputMaybe<ConnectBrandRelation>;
  category?: InputMaybe<ConnectCategoryRelation>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  inventories?: InputMaybe<ConnectInventoriesRelation>;
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
};

/** A paginated list of Product items. */
export type ProductPaginator = {
  __typename?: 'ProductPaginator';
  /** A list of Product items. */
  data: Array<Product>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: 'Query';
  brands: Array<Maybe<Brand>>;
  brandsCount: Scalars['Int']['output'];
  brandsPaginate: BrandPaginator;
  categories: Array<Maybe<Category>>;
  categoriesCount: Scalars['Int']['output'];
  categoriesPaginate: CategoryPaginator;
  inventories: Array<Maybe<Inventory>>;
  inventoriesCount: Scalars['Int']['output'];
  inventoriesPaginate: InventoryPaginator;
  me: User;
  permissions: Array<Maybe<Permission>>;
  permissionsPaginate: PermissionPaginator;
  products: Array<Maybe<Product>>;
  productsCount: Scalars['Int']['output'];
  productsPaginate: ProductPaginator;
  roles: Array<Maybe<Role>>;
  rolesPaginate: RolePaginator;
  users: Array<Maybe<User>>;
  usersPaginate: UserPaginator;
};


export type QueryBrandsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBrandsPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoriesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInventoriesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInventoriesPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPermissionsPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryProductsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRolesPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryUsersPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  updated_at: Scalars['DateTime']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type RoleInput = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

/** A paginated list of Role items. */
export type RolePaginator = {
  __typename?: 'RolePaginator';
  /** A list of Role items. */
  data: Array<Role>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type SortInput = {
  column?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  is_admin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  roles: Array<Maybe<Role>>;
  updated_at: Scalars['DateTime']['output'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string, is_admin: boolean, roles: Array<{ __typename?: 'Role', name: string } | null> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string, is_admin: boolean, roles: Array<{ __typename?: 'Role', name: string } | null> } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutResponse', message: string } | null };

export type UserFragment = { __typename?: 'User', id: string, name: string, email: string, password: string, is_admin: boolean, is_active: boolean, created_at: any, updated_at: any, deleted_at?: any | null, roles: Array<{ __typename?: 'Role', id: string, name: string } | null> } & { ' $fragmentName'?: 'UserFragment' };

export type RoleFragment = { __typename?: 'Role', id: string, name: string, guard_name: string, created_at: any, updated_at: any, users?: Array<{ __typename?: 'User', id: string, name: string } | null> | null, permissions?: Array<{ __typename?: 'Permission', id: string, name: string } | null> | null } & { ' $fragmentName'?: 'RoleFragment' };

export type PermissionFragment = { __typename?: 'Permission', id: string, name: string, guard_name: string, created_at: any, updated_at: any, roles?: Array<{ __typename?: 'Role', id: string, name: string } | null> | null } & { ' $fragmentName'?: 'PermissionFragment' };

export type PermissionsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type PermissionsPaginateQuery = { __typename?: 'Query', permissionsPaginate: { __typename?: 'PermissionPaginator', data: Array<(
      { __typename?: 'Permission' }
      & { ' $fragmentRefs'?: { 'PermissionFragment': PermissionFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertPermissionMutationVariables = Exact<{
  input: PermissionInput;
}>;


export type UpsertPermissionMutation = { __typename?: 'Mutation', upsertPermission: (
    { __typename?: 'Permission' }
    & { ' $fragmentRefs'?: { 'PermissionFragment': PermissionFragment } }
  ) };

export type DeletePermissionMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deletePermission?: Array<{ __typename?: 'Permission', id: string } | null> | null };

export type RolesPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type RolesPaginateQuery = { __typename?: 'Query', rolesPaginate: { __typename?: 'RolePaginator', data: Array<(
      { __typename?: 'Role' }
      & { ' $fragmentRefs'?: { 'RoleFragment': RoleFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertRoleMutationVariables = Exact<{
  input: RoleInput;
}>;


export type UpsertRoleMutation = { __typename?: 'Mutation', upsertRole: (
    { __typename?: 'Role' }
    & { ' $fragmentRefs'?: { 'RoleFragment': RoleFragment } }
  ) };

export type DeleteRoleMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole?: Array<{ __typename?: 'Role', id: string } | null> | null };

export type UsersPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type UsersPaginateQuery = { __typename?: 'Query', usersPaginate: { __typename?: 'UserPaginator', data: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) };

export type DeleteUserMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: Array<{ __typename?: 'User', id: string } | null> | null };

export type RestoreUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreUserMutation = { __typename?: 'Mutation', restoreUser: { __typename?: 'User', id: string } };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const RoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<RoleFragment, unknown>;
export const PermissionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<PermissionFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const PermissionsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"permissionsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"permission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<PermissionsPaginateQuery, PermissionsPaginateQueryVariables>;
export const UpsertPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"permission"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertPermissionMutation, UpsertPermissionMutationVariables>;
export const DeletePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePermissionMutation, DeletePermissionMutationVariables>;
export const RolesPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"rolesPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rolesPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<RolesPaginateQuery, RolesPaginateQueryVariables>;
export const UpsertRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertRoleMutation, UpsertRoleMutationVariables>;
export const DeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const UsersPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"usersPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UsersPaginateQuery, UsersPaginateQueryVariables>;
export const UpsertUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UpsertUserMutation, UpsertUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const RestoreUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restoreUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RestoreUserMutation, RestoreUserMutationVariables>;