export const USERS_CONTROLLER = 'users' as const;

export const USERS_ROUTES = {
  ME: '@me',
  GET_BY_NAME: ':name',
  UPDATE_PROFILE: 'profile'
} as const;