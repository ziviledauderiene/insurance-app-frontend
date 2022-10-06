import { EndpointsConfig, Portals } from 'interfaces';

export const routes: [Portals.admin, Portals.employer, Portals.consumer,] = [
  Portals.admin,
  Portals.employer,
  Portals.consumer,
];

export const endpoints: EndpointsConfig = {
  login: 'api/login',
  validate: 'api/validate',
  employers: 'api/employers',
  users: 'api/users',
  claims: 'api/claims'
};

export const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;