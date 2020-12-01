/* eslint-disable */
import gql from 'graphql-tag'
import * as VueApolloComposable from '@vue/apollo-composable'
import * as VueCompositionApi from '@vue/composition-api'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Query = {
  __typename?: 'Query'
  currentUser: Account
  accounts: Array<Account>
  account: Account
  viewer: Viewer
  roster: RosterQueryResult
  rosterDispatchGroup: RosterDispatchGroupQueryResult
  plant: PlantQueryResult
  driver: DriverQueryResult
  truck: TruckQueryResult
}

export type QueryAccountArgs = {
  accountIdentifier: Scalars['String']
}

export type QueryRosterArgs = {
  truckId?: Maybe<Scalars['String']>
  dispatchGroup?: Maybe<Scalars['String']>
  radioId?: Maybe<Scalars['String']>
  driverId?: Maybe<Scalars['String']>
  fromDate?: Maybe<Scalars['DateTime']>
  date?: Maybe<Scalars['DateTime']>
}

export type QueryRosterDispatchGroupArgs = {
  fromDate?: Maybe<Scalars['DateTime']>
  date?: Maybe<Scalars['DateTime']>
}

export type QueryPlantArgs = {
  country?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type QueryDriverArgs = {
  email?: Maybe<Scalars['String']>
  dispatchGroup?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type QueryTruckArgs = {
  radioId?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  accountIdentifier: Scalars['String']
  name?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  preference?: Maybe<Preference>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Preference = {
  __typename?: 'Preference'
  id: Scalars['ID']
  account: Account
  language: Scalars['String']
  darkMode: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Viewer = {
  __typename?: 'Viewer'
  preference?: Maybe<Preference>
}

export type RosterQueryResult = RosterArray | ApiError

export type RosterArray = {
  __typename?: 'RosterArray'
  data?: Maybe<Array<Roster>>
}

export type Roster = {
  __typename?: 'Roster'
  truckId?: Maybe<Scalars['String']>
  radioId?: Maybe<Scalars['String']>
  driverId?: Maybe<Scalars['String']>
  driverFirstName?: Maybe<Scalars['String']>
  driverLastName?: Maybe<Scalars['String']>
  driverEmail?: Maybe<Scalars['String']>
  despatchGroup?: Maybe<Scalars['String']>
  plantId: Scalars['ID']
  plantName?: Maybe<Scalars['String']>
  plantTimezone?: Maybe<Scalars['String']>
  plantStreetHouse?: Maybe<Scalars['String']>
  plantCountry?: Maybe<Scalars['String']>
  plantCity?: Maybe<Scalars['String']>
  startPlantLoadingDateTime?: Maybe<Scalars['String']>
  truck?: Maybe<Truck>
}

export type Truck = {
  __typename?: 'Truck'
  id?: Maybe<Scalars['String']>
  radioId?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  fleetNr?: Maybe<Scalars['String']>
  maxLegalWeight?: Maybe<Scalars['Float']>
  maxCapacity?: Maybe<Scalars['Float']>
  maxPumpCapacity?: Maybe<Scalars['Float']>
  tareDate?: Maybe<Scalars['String']>
  tareTime?: Maybe<Scalars['String']>
  tareWeight?: Maybe<Scalars['Float']>
  minLoadSize?: Maybe<Scalars['Float']>
  emptySpeed?: Maybe<Scalars['Float']>
  speedUnit?: Maybe<Scalars['String']>
  loadedSpeed?: Maybe<Scalars['Float']>
  haulerVendorId?: Maybe<Scalars['String']>
}

export type ApiError = {
  __typename?: 'ApiError'
  message: Scalars['String']
  code: Scalars['String']
}

export type RosterDispatchGroupQueryResult = RosterDispatchGroupArray | ApiError

export type RosterDispatchGroupArray = {
  __typename?: 'RosterDispatchGroupArray'
  data?: Maybe<Array<RosterDispatchGroup>>
}

export type RosterDispatchGroup = {
  __typename?: 'RosterDispatchGroup'
  date: Scalars['String']
  dispatchGroup: Array<Scalars['String']>
}

export type PlantQueryResult = PlantArray | ApiError

export type PlantArray = {
  __typename?: 'PlantArray'
  data?: Maybe<Array<Plant>>
}

export type Plant = {
  __typename?: 'Plant'
  id: Scalars['ID']
  name: Scalars['String']
  customerNrPlant: Scalars['String']
  vendorNrPlant: Scalars['String']
  factoryCalendar: Scalars['String']
  streetHouse: Scalars['String']
  country: Scalars['String']
  postCode: Scalars['String']
  city: Scalars['String']
  purchasingOrg: Scalars['String']
  region: Scalars['String']
}

export type DriverQueryResult = DriverArray | ApiError

export type DriverArray = {
  __typename?: 'DriverArray'
  data?: Maybe<Array<Driver>>
}

export type Driver = {
  __typename?: 'Driver'
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  telephone?: Maybe<Scalars['String']>
  despatchGroup?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  postCode?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  streetHouse?: Maybe<Scalars['String']>
  additionalRefNr?: Maybe<Scalars['String']>
  specialProp?: Maybe<Scalars['String']>
  mainWorkPlant?: Maybe<Scalars['String']>
  createdOn?: Maybe<Scalars['String']>
  deletionFlag?: Maybe<Scalars['String']>
}

export type TruckQueryResult = TruckArray | ApiError

export type TruckArray = {
  __typename?: 'TruckArray'
  data?: Maybe<Array<Truck>>
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

export type AllAccountsQueryVariables = Exact<{ [key: string]: never }>

export type AllAccountsQuery = { __typename?: 'Query' } & {
  accounts: Array<
    { __typename?: 'Account' } & Pick<Account, 'accountIdentifier' | 'name'>
  >
}

export type SetDarkModeMutationVariables = Exact<{
  darkMode: Scalars['Boolean']
}>

export type SetDarkModeMutation = { __typename?: 'Mutation' } & {
  setViewerPreference: { __typename?: 'Preference' } & Pick<
    Preference,
    'id' | 'darkMode'
  >
}

export type SetLanguageMutationVariables = Exact<{
  language: Scalars['String']
}>

export type SetLanguageMutation = { __typename?: 'Mutation' } & {
  setViewerPreference: { __typename?: 'Preference' } & Pick<
    Preference,
    'id' | 'language'
  >
}

export type SetPreferenceDefaultMutationVariables = Exact<{
  darkMode: Scalars['Boolean']
  language?: Maybe<Scalars['String']>
}>

export type SetPreferenceDefaultMutation = { __typename?: 'Mutation' } & {
  setViewerPreference: { __typename?: 'Preference' } & Pick<
    Preference,
    'id' | 'darkMode' | 'language'
  >
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = { __typename?: 'Query' } & {
  viewer: { __typename?: 'Viewer' } & {
    preference?: Maybe<
      { __typename?: 'Preference' } & Pick<
        Preference,
        'id' | 'language' | 'darkMode'
      >
    >
  }
}

export type SapTruckRosterDriverQueryVariables = Exact<{
  id: Scalars['String']
}>

export type SapTruckRosterDriverQuery = { __typename?: 'Query' } & {
  driver:
    | ({ __typename?: 'DriverArray' } & {
        data?: Maybe<
          Array<
            { __typename?: 'Driver' } & Pick<
              Driver,
              'id' | 'email' | 'country' | 'firstName' | 'lastName' | 'postCode'
            >
          >
        >
      })
    | ({ __typename?: 'ApiError' } & Pick<ApiError, 'code' | 'message'>)
}

export type SapTruckRosterRosterQueryVariables = Exact<{
  fromDate: Scalars['DateTime']
  truckId: Scalars['String']
}>

export type SapTruckRosterRosterQuery = { __typename?: 'Query' } & {
  roster:
    | ({ __typename?: 'RosterArray' } & {
        data?: Maybe<
          Array<
            { __typename?: 'Roster' } & Pick<
              Roster,
              | 'truckId'
              | 'radioId'
              | 'driverId'
              | 'driverFirstName'
              | 'driverLastName'
              | 'startPlantLoadingDateTime'
              | 'driverEmail'
              | 'plantId'
            > & {
                truck?: Maybe<
                  { __typename?: 'Truck' } & Pick<Truck, 'id' | 'country'>
                >
              }
          >
        >
      })
    | ({ __typename?: 'ApiError' } & Pick<ApiError, 'code' | 'message'>)
}

export type SapTruckRosterDispatchGroupQueryVariables = Exact<{
  fromDate: Scalars['DateTime']
}>

export type SapTruckRosterDispatchGroupQuery = { __typename?: 'Query' } & {
  rosterDispatchGroup:
    | ({ __typename?: 'RosterDispatchGroupArray' } & {
        data?: Maybe<
          Array<
            { __typename?: 'RosterDispatchGroup' } & Pick<
              RosterDispatchGroup,
              'date' | 'dispatchGroup'
            >
          >
        >
      })
    | ({ __typename?: 'ApiError' } & Pick<ApiError, 'code' | 'message'>)
}

export type SapTruckRosterTruckQueryVariables = Exact<{
  id: Scalars['String']
}>

export type SapTruckRosterTruckQuery = { __typename?: 'Query' } & {
  truck:
    | ({ __typename?: 'TruckArray' } & {
        data?: Maybe<
          Array<
            { __typename?: 'Truck' } & Pick<
              Truck,
              | 'id'
              | 'radioId'
              | 'country'
              | 'fleetNr'
              | 'maxLegalWeight'
              | 'tareWeight'
              | 'minLoadSize'
              | 'maxCapacity'
              | 'maxPumpCapacity'
              | 'tareDate'
              | 'tareTime'
              | 'emptySpeed'
              | 'speedUnit'
            >
          >
        >
      })
    | ({ __typename?: 'ApiError' } & Pick<ApiError, 'message'>)
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
 * const { result, loading, error } = useAllAccountsQuery();
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
  return VueApolloComposable.useQuery<
    AllAccountsQuery,
    AllAccountsQueryVariables
  >(AllAccountsDocument, {}, options)
}
export type AllAccountsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  AllAccountsQuery,
  AllAccountsQueryVariables
>
export const SetDarkModeDocument = gql`
  mutation setDarkMode($darkMode: Boolean!) {
    setViewerPreference(options: { darkMode: $darkMode }) {
      id
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
 *     darkMode: // value for 'darkMode'
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
      id
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
 *     language: // value for 'language'
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
export const SetPreferenceDefaultDocument = gql`
  mutation setPreferenceDefault($darkMode: Boolean!, $language: String) {
    setViewerPreference(options: { darkMode: $darkMode, language: $language }) {
      id
      darkMode
      language
    }
  }
`

/**
 * __useSetPreferenceDefaultMutation__
 *
 * To run a mutation, you first call `useSetPreferenceDefaultMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetPreferenceDefaultMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetPreferenceDefaultMutation({
 *   variables: {
 *     darkMode: // value for 'darkMode'
 *     language: // value for 'language'
 *   },
 * });
 */
export function useSetPreferenceDefaultMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SetPreferenceDefaultMutation,
        SetPreferenceDefaultMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SetPreferenceDefaultMutation,
          SetPreferenceDefaultMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    SetPreferenceDefaultMutation,
    SetPreferenceDefaultMutationVariables
  >(SetPreferenceDefaultDocument, options)
}
export type SetPreferenceDefaultMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SetPreferenceDefaultMutation,
  SetPreferenceDefaultMutationVariables
>
export const ViewerDocument = gql`
  query viewer {
    viewer {
      preference {
        id
        language
        darkMode
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
 * const { result, loading, error } = useViewerQuery();
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
  return VueApolloComposable.useQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    {},
    options
  )
}
export type ViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  ViewerQuery,
  ViewerQueryVariables
>
export const SapTruckRosterDriverDocument = gql`
  query sapTruckRosterDriver($id: String!) {
    driver(id: $id) {
      ... on ApiError {
        code
        message
      }
      ... on DriverArray {
        data {
          id
          email
          country
          firstName
          lastName
          email
          postCode
        }
      }
    }
  }
`

/**
 * __useSapTruckRosterDriverQuery__
 *
 * To run a query within a Vue component, call `useSapTruckRosterDriverQuery` and pass it any options that fit your needs.
 * When your component renders, `useSapTruckRosterDriverQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSapTruckRosterDriverQuery({
 *   id: // value for 'id'
 * });
 */
export function useSapTruckRosterDriverQuery(
  variables:
    | SapTruckRosterDriverQueryVariables
    | VueCompositionApi.Ref<SapTruckRosterDriverQueryVariables>
    | ReactiveFunction<SapTruckRosterDriverQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        SapTruckRosterDriverQuery,
        SapTruckRosterDriverQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterDriverQuery,
          SapTruckRosterDriverQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterDriverQuery,
          SapTruckRosterDriverQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    SapTruckRosterDriverQuery,
    SapTruckRosterDriverQueryVariables
  >(SapTruckRosterDriverDocument, variables, options)
}
export type SapTruckRosterDriverQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SapTruckRosterDriverQuery,
  SapTruckRosterDriverQueryVariables
>
export const SapTruckRosterRosterDocument = gql`
  query sapTruckRosterRoster($fromDate: DateTime!, $truckId: String!) {
    roster(fromDate: $fromDate, truckId: $truckId) {
      ... on ApiError {
        code
        message
      }
      ... on RosterArray {
        data {
          truck {
            id
            country
          }
          truckId
          radioId
          driverId
          driverFirstName
          driverLastName
          startPlantLoadingDateTime
          driverEmail
          plantId
        }
      }
    }
  }
`

/**
 * __useSapTruckRosterRosterQuery__
 *
 * To run a query within a Vue component, call `useSapTruckRosterRosterQuery` and pass it any options that fit your needs.
 * When your component renders, `useSapTruckRosterRosterQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSapTruckRosterRosterQuery({
 *   fromDate: // value for 'fromDate'
 *   truckId: // value for 'truckId'
 * });
 */
export function useSapTruckRosterRosterQuery(
  variables:
    | SapTruckRosterRosterQueryVariables
    | VueCompositionApi.Ref<SapTruckRosterRosterQueryVariables>
    | ReactiveFunction<SapTruckRosterRosterQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        SapTruckRosterRosterQuery,
        SapTruckRosterRosterQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterRosterQuery,
          SapTruckRosterRosterQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterRosterQuery,
          SapTruckRosterRosterQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    SapTruckRosterRosterQuery,
    SapTruckRosterRosterQueryVariables
  >(SapTruckRosterRosterDocument, variables, options)
}
export type SapTruckRosterRosterQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SapTruckRosterRosterQuery,
  SapTruckRosterRosterQueryVariables
>
export const SapTruckRosterDispatchGroupDocument = gql`
  query sapTruckRosterDispatchGroup($fromDate: DateTime!) {
    rosterDispatchGroup(fromDate: $fromDate) {
      ... on ApiError {
        code
        message
      }
      ... on RosterDispatchGroupArray {
        data {
          date
          dispatchGroup
        }
      }
    }
  }
`

/**
 * __useSapTruckRosterDispatchGroupQuery__
 *
 * To run a query within a Vue component, call `useSapTruckRosterDispatchGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useSapTruckRosterDispatchGroupQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSapTruckRosterDispatchGroupQuery({
 *   fromDate: // value for 'fromDate'
 * });
 */
export function useSapTruckRosterDispatchGroupQuery(
  variables:
    | SapTruckRosterDispatchGroupQueryVariables
    | VueCompositionApi.Ref<SapTruckRosterDispatchGroupQueryVariables>
    | ReactiveFunction<SapTruckRosterDispatchGroupQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        SapTruckRosterDispatchGroupQuery,
        SapTruckRosterDispatchGroupQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterDispatchGroupQuery,
          SapTruckRosterDispatchGroupQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterDispatchGroupQuery,
          SapTruckRosterDispatchGroupQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    SapTruckRosterDispatchGroupQuery,
    SapTruckRosterDispatchGroupQueryVariables
  >(SapTruckRosterDispatchGroupDocument, variables, options)
}
export type SapTruckRosterDispatchGroupQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SapTruckRosterDispatchGroupQuery,
  SapTruckRosterDispatchGroupQueryVariables
>
export const SapTruckRosterTruckDocument = gql`
  query sapTruckRosterTruck($id: String!) {
    truck(id: $id) {
      ... on ApiError {
        message
      }
      ... on TruckArray {
        data {
          id
          radioId
          country
          fleetNr
          maxLegalWeight
          tareWeight
          minLoadSize
          radioId
          maxCapacity
          maxPumpCapacity
          tareDate
          tareTime
          tareWeight
          minLoadSize
          emptySpeed
          speedUnit
        }
      }
    }
  }
`

/**
 * __useSapTruckRosterTruckQuery__
 *
 * To run a query within a Vue component, call `useSapTruckRosterTruckQuery` and pass it any options that fit your needs.
 * When your component renders, `useSapTruckRosterTruckQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSapTruckRosterTruckQuery({
 *   id: // value for 'id'
 * });
 */
export function useSapTruckRosterTruckQuery(
  variables:
    | SapTruckRosterTruckQueryVariables
    | VueCompositionApi.Ref<SapTruckRosterTruckQueryVariables>
    | ReactiveFunction<SapTruckRosterTruckQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        SapTruckRosterTruckQuery,
        SapTruckRosterTruckQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterTruckQuery,
          SapTruckRosterTruckQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          SapTruckRosterTruckQuery,
          SapTruckRosterTruckQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    SapTruckRosterTruckQuery,
    SapTruckRosterTruckQueryVariables
  >(SapTruckRosterTruckDocument, variables, options)
}
export type SapTruckRosterTruckQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SapTruckRosterTruckQuery,
  SapTruckRosterTruckQueryVariables
>
