
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "AccountAddResult",
        "possibleTypes": [
          {
            "name": "Account"
          },
          {
            "name": "ExistsAlready"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "AccountUpdateResult",
        "possibleTypes": [
          {
            "name": "Account"
          },
          {
            "name": "NotFound"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "AccountRemoveResult",
        "possibleTypes": [
          {
            "name": "Success"
          },
          {
            "name": "NotFound"
          }
        ]
      }
    ]
  }
};
      export default result;
    