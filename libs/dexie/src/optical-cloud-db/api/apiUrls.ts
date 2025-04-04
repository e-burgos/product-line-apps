import { ApiResponses } from './types/apiTypes';

export const apiUrls: { [api in keyof ApiResponses]: string } = {
  // Auth
  'post-token': '/token',
  'get-token-validate': '/token/validate',
  // Users
  'get-users': '/users',
  'post-users': '/users',
  // Prescriptions
  'get-prescriptions': '/all/prescriptions',
  'get-user-prescriptions': '/my/prescriptions',
  // Customers
  'get-customers': '/all/customers',
  'get-user-customers': '/my/customers',
};
