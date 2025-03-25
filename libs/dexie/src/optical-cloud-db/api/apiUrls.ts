import { ApiResponses } from './types/apiTypes';

export const apiUrls: { [api in keyof ApiResponses]: string } = {
  'post-token': '/token',
  'get-token-validate': '/token/validate',
  'get-users': '/users',
  'post-users': '/users',
  'get-user-prescriptions': '/all/prescriptions',
};
