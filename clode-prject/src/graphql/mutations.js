export const createTasksTable = /* GraphQL */ `
  mutation CreateTasksTable($input: CreateTasksTableInput!) {
    createTasksTable(input: $input) {
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

export const updateTasksTable = /* GraphQL */ `
  mutation UpdateTasksTable($input: UpdateTasksTableInput!) {
    updateTasksTable(input: $input) {
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

export const deleteTasksTable = /* GraphQL */ `
  mutation DeleteTasksTable($input: DeleteTasksTableInput!) {
    deleteTasksTable(input: $input) {
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