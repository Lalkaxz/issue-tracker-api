export const ADMIN_CONTROLLER = 'admin.*host' as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: 'users',
  UPDATE_USER_ROLE: 'users/:id/role',
  DEACTIVATE_USER: 'users/:id/deactivate',
  DELETE_USER: 'users/:id'
} as const;