export const PROJECTS_CONTROLLER = 'projects' as const;

export const PROJECTS_ROUTES = {
  CREATE: '',
  GET_ALL: '',
  GET_BY_ID: ':projectId',
  UPDATE: ':projectId',
  DELETE: ':projectId'
} as const;
