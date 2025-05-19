export const onCreateTasksTable = /* GraphQL */ `
  subscription OnCreateTasksTable {
    onCreateTasksTable {
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

export const onUpdateTasksTable = /* GraphQL */ `
  subscription OnUpdateTasksTable {
    onUpdateTasksTable {
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

export const onDeleteTasksTable = /* GraphQL */ `
  subscription OnDeleteTasksTable {
    onDeleteTasksTable {
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