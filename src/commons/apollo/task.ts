import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput!) {
    createTask(task: $task) {
      id
      terminate
      title
    }
  }
`;

export const GET_ALL_TASKS = gql`
 query($sorts: [Sort]) {
    getAllTasks(sorts: $sorts) {
        id
        title
        terminate
    }
 }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id:ID!,
    $task: TaskInput
  ) {
    updateTask(id: $id, task: $task) {
      id
    }
  }
`;


export const DELETE_TASK = gql`
  mutation DeleteTask(
    $id:ID!
  ) {
    deleteTask(id: $id) {
        id
    }
  }
`;