export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    RosterQueryResult: ['RosterArray', 'ApiError'],
    RosterDispatchGroupQueryResult: ['RosterDispatchGroupArray', 'ApiError'],
    PlantQueryResult: ['PlantArray', 'ApiError'],
    DriverQueryResult: ['DriverArray', 'ApiError'],
    TruckQueryResult: ['TruckArray', 'ApiError'],
    AccountAddResult: ['Account', 'ExistsAlready'],
    AccountUpdateResult: ['Account', 'NotFound'],
    AccountRemoveResult: ['Success', 'NotFound'],
  },
}
export default result
