export const COMMENTS_CONTROLLER = 'issues/:id/comments' as const;

export const COMMENTS_ROUTES = {
  CREATE: '',
  GET_ALL: '',
  GET_BY_ID: ':commentId',
  UPDATE: ':commentId',
  DELETE: ':commentId'
} as const;