export enum Portals {
  admin = 'admin',
  employer = 'employer',
  consumer = 'consumer',
}
export enum AdminPages {
  setup = 'setup',
  profile = 'profile',
  users = 'users',
  rules = 'rules',
  plans = 'plans',
}
export enum UserTypes {
  admin = 'admin',
  employer = 'employer',
  consumer = 'consumer',
}
export enum FormNames {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  username = 'username',
  password = 'password',
}
export interface FormValues {
  [name: string]: string;
}
export enum FormActions {
  addUser,
  updateUser,
}
export interface EndpointsConfig {
  login: string;
  validate: string;
  employers: string;
  users: string;
  claims: string
}
export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  userType?: UserTypes;
  id?: string
}
export interface Employer {
  name: string;
  code: string;
  street: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
  id: string;
}

export interface Claim {
  claimNumber: string;
  amount: string;
  consumer: string
  date: string
  plan: string
  status: string
}