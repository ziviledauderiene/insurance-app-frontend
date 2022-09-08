/* eslint-disable no-unused-vars */
export enum Portals {
  admin = 'admin',
  employer = 'employer',
  consumer = 'consumer',
}
export enum LoginFormNames {
  username = 'username',
  password = 'password',
}
export interface FormValues {
  [name: string]: string;
}
export interface EndpointsConfig {
  login: string;
  validate: string;
}
export interface User {
  username?: string;
  userType?: string;
}