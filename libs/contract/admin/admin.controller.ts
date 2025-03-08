export const ADMIN_CONTROLLER = 'admin' as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: 'users',
  GET_ALL_ISSUES: 'issues',
  GET_ALL_COMMENTS: 'comments',
  UPDATE_USER_ROLE: 'users/:userId/role',
  DEACTIVATE_USER: 'users/:userId/deactivate',
  DELETE_USER: 'users/:userId',
  DELETE_PROJECT: 'projects/:projectId',
  DELETE_ISSUE: 'issues/:issueId',
  DELETE_COMMENT: 'comments/:commentId'
} as const;
