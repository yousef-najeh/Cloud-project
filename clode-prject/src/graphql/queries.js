export const getTasksTable = /* GraphQL */ `
  query GetTasksTable($id: String!) {
    getTasksTable(id: $id) {
      id
      intentName
      timestamp
      status
      details
      userId
      message
    }
  }
`;

export const listTasksTables = /* GraphQL */ `
  query ListTasksTables($filter: TableTasksTableFilterInput, $limit: Int, $nextToken: String) {
    listTasksTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        intentName
        timestamp
        status
        details
        userId
        message
      }
      nextToken
    }
  }
`; 