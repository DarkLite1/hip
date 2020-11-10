export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    AccountAddResult: ['Account', 'ExistsAlready'],
    AccountUpdateResult: ['Account', 'NotFound'],
    AccountRemoveResult: ['Success', 'NotFound'],
  },
}
export default result
