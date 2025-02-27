export const ISSUES_CONTROLLER = 'issues' as const;

export const ISSUES_ROUTES = {
  CREATE: '',
  GET_ALL: '',
  GET_BY_ID: ':id',
  UPDATE: ':id',
  DELETE: 'id'
} as const;