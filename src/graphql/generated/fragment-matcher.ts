export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    AccountAddResult: ['Account', 'ExistsAlready'],
    AccountRemoveResult: ['Success', 'NotFound'],
    AccountUpdateResult: ['Account', 'NotFound'],
    DriverQueryResult: ['DriverArray', 'ApiError'],
    PlantQueryResult: ['PlantArray', 'ApiError'],
    RosterDispatchGroupQueryResult: ['RosterDispatchGroupArray', 'ApiError'],
    RosterQueryResult: ['RosterArray', 'ApiError'],
    TruckQueryResult: ['TruckArray', 'ApiError'],
  },
}
export default result
