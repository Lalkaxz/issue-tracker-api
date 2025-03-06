export const ISSUES_CONTROLLER = 'projects/:projectId/issues' as const;

export const ISSUES_ROUTES = {
  CREATE: '',
  GET_ALL: '',
  GET_BY_ID: ':issueId',
  UPDATE: ':issueId',
  DELETE: ':issueId'
} as const;