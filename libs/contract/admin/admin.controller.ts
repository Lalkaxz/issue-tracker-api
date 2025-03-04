export const ADMIN_CONTROLLER = 'admin' as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: 'users',
  GET_ALL_ISSUES: 'issues',
  GET_ALL_COMMENTS: 'comments',
  UPDATE_USER_ROLE: 'users/:id/role',
  DEACTIVATE_USER: 'users/:id/deactivate',
  DELETE_USER: 'users/:id',
  DELETE_ISSUE: 'issues/:id',
  DELETE_COMMENT: 'comments/:id'
} as const;