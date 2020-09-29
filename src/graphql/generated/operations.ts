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
  darkMode: Scalars['Boolean']
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
  darkMode?: Maybe<Scalars['Boolean']>
}

export type SetDarkModeMutationVariables = Exact<{
  darkMode: Scalars['Boolean']
}>

export type SetDarkModeMutation = { __typename?: 'Mutation' } & {
  setViewerPreference: { __typename?: 'Preference' } & Pick<
    Preference,
    'darkMode'
  >
}

export type SetLanguageMutationVariables = Exact<{
  language: Scalars['String']
}>

export type SetLanguageMutation = { __typename?: 'Mutation' } & {
  setViewerPreference: { __typename?: 'Preference' } & Pick<
    Preference,
    'language'
  >
}

export type AllAccountsQueryVariables = Exact<{ [key: string]: never }>

export type AllAccountsQuery = { __typename?: 'Query' } & {
  accounts: Array<
    { __typename?: 'Account' } & Pick<Account, 'accountIdentifier' | 'name'>
  >
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = { __typename?: 'Query' } & {
  viewer: { __typename?: 'Viewer' } & {
    preference?: Maybe<
      { __typename?: 'Preference' } & Pick<Preference, 'language'>
    >
  }
}

export const SetDarkModeDocument = gql`
  mutation setDarkMode($darkMode: Boolean!) {
    setViewerPreference(options: { darkMode: $darkMode }) {
      darkMode
    }
  }
`

/**
 * __useSetDarkModeMutation__
 *
 * To run a mutation, you first call `useSetDarkModeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetDarkModeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetDarkModeMutation({
 *   variables: {
 *      darkMode: // value for 'darkMode'
 *   },
 * });
 */
export function useSetDarkModeMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SetDarkModeMutation,
        SetDarkModeMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SetDarkModeMutation,
          SetDarkModeMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    SetDarkModeMutation,
    SetDarkModeMutationVariables
  >(SetDarkModeDocument, options)
}
export type SetDarkModeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SetDarkModeMutation,
  SetDarkModeMutationVariables
>
export const SetLanguageDocument = gql`
  mutation setLanguage($language: String!) {
    setViewerPreference(options: { language: $language }) {
      language
    }
  }
`

/**
 * __useSetLanguageMutation__
 *
 * To run a mutation, you first call `useSetLanguageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetLanguageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetLanguageMutation({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useSetLanguageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SetLanguageMutation,
        SetLanguageMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SetLanguageMutation,
          SetLanguageMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    SetLanguageMutation,
    SetLanguageMutationVariables
  >(SetLanguageDocument, options)
}
export type SetLanguageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SetLanguageMutation,
  SetLanguageMutationVariables
>
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
export const ViewerDocument = gql`
  query viewer {
    viewer {
      preference {
        language
      }
    }
  }
`

/**
 * __useViewerQuery__
 *
 * To run a query within a Vue component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useViewerQuery(
 *   {
 *   }
 * );
 */
export function useViewerQuery(
  options:
    | VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>
      > = {}
) {
  return VueApolloComposable.useQuery<ViewerQuery, undefined>(
    ViewerDocument,
    undefined,
    options
  )
}
export type ViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  ViewerQuery,
  ViewerQueryVariables
>
