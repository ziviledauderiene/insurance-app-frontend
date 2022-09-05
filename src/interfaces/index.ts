/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/prefer-default-export
export enum Portals {
  admin = 'admin',
  employer = 'employer',
  consumer = 'consumer',
}

export enum LoginFormNames {
  username = "username",
  password = "password"
}

export interface FormValues {
  [name: string]: string
}

export interface EndpointsConfig {
  login: string
}