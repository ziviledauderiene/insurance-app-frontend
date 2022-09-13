import { EndpointsConfig, Portals } from 'interfaces';

// eslint-disable-next-line import/prefer-default-export
export const routes: [Portals.admin, Portals.employer, Portals.consumer] = [
  Portals.admin,
  Portals.employer,
  Portals.consumer,
];

export const endpoints: EndpointsConfig = {
  login: 'api/login',
  validate: 'api/validate',
  employers: 'api/employers',
};
