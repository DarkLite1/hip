/* eslint-disable */
import gql from 'graphql-tag'
import * as VueApolloComposable from '@vue/apollo-composable'
import * as VueCompositionApi from '@vue/composition-api'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  currentUser: Account
  accounts: Array<Account>
  account: Account
  viewer: Viewer
}

export type QueryAccountArgs = {
  accountIdentifier: Scalars['String']
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['Int']
  accountIdentifier: Scalars['String']
  name?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  preference?: Maybe<Preference>
}

export type Preference = {
  __typename?: 'Preference'
  id: Scalars['Int']
  language: Scalars['String']
}

export type Viewer = {
  __typename?: 'Viewer'
  preference?: Maybe<Preference>
}

export type Mutation = {
  __typename?: 'Mutation'
  addAccount: AccountAddResult
  updateAccount: AccountUpdateResult
  removeAccount: AccountRemoveResult
  setViewerPreference: Preference
}

export type MutationAddAccountArgs = {
  options: AccountAddInput
}

export type MutationUpdateAccountArgs = {
  input: AccountUpdateInput
  accountIdentifier: Scalars['String']
}

export type MutationRemoveAccountArgs = {
  accountIdentifier: Scalars['String']
}

export type MutationSetViewerPreferenceArgs = {
  options: AddPreferenceInput
}

export type AccountAddResult = Account | ExistsAlready

export type ExistsAlready = {
  __typename?: 'ExistsAlready'
  message: Scalars['String']
  account: Account
}

export type AccountAddInput = {
  accountIdentifier: Scalars['String']
  name?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
}

export type AccountUpdateResult = Account | NotFound

export type NotFound = {
  __typename?: 'NotFound'
  message: Scalars['String']
}

export type AccountUpdateInput = {
  name?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
}

export type AccountRemoveResult = Success | NotFound

export type Success = {
  __typename?: 'Success'
  message: Scalars['String']
}

export type AddPreferenceInput = {
  language?: Maybe<Scalars['String']>
}

export type AllAccountsQueryVariables = Exact<{ [key: string]: never }>

export type AllAccountsQuery = { __typename?: 'Query' } & {
  accounts: Array<
    { __typename?: 'Account' } & Pick<Account, 'accountIdentifier' | 'name'>
  >
}

export const AllAccountsDocument = gql`
  query allAccounts {
    accounts {
      accountIdentifier
      name
    }
  }
`

/**
 * __useAllAccountsQuery__
 *
 * To run a query within a Vue component, call `useAllAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAccountsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAllAccountsQuery(
 *   {
 *   }
 * );
 */
export function useAllAccountsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        AllAccountsQuery,
        AllAccountsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          AllAccountsQuery,
          AllAccountsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          AllAccountsQuery,
          AllAccountsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<AllAccountsQuery, undefined>(
    AllAccountsDocument,
    undefined,
    options
  )
}
export type AllAccountsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  AllAccountsQuery,
  AllAccountsQueryVariables
>
