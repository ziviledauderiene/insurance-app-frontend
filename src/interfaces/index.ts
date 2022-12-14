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
  claims = 'claims',
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
  add,
  update,
}
export interface EndpointsConfig {
  login: string;
  validate: string;
  employers: string;
  users: string;
  claims: string;
  plans: string;
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  userType: UserTypes;
  id: string;
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
export enum Plan {
  dental = 'dental',
  medical = 'medical',
}
export enum ClaimStatus {
  pending = 'pending',
  approved = 'approved',
  denied = 'denied',
}
export type Claim = {
  id: string;
  claimNumber: string;
  employer: string;
  consumer: string;
  date: string;
  plan: Plan;
  amount: string;
  status: ClaimStatus;
};
export enum DialogAction {
  approve = 'approve',
  deny = 'deny',
  delete = 'delete',
  initialize = 'initialize',
}
export enum PayrollFrequency {
  weekly = 'weekly',
  monthly = 'monthly',
}
export enum PlanYearStatus {
  initialized = 'initialized',
  notInitialized = 'not initialized',
}
export interface PlanYear {
  id: string;
  employer: string;
  startDate: Date;
  endDate: Date;
  payrollFrequency: PayrollFrequency;
  plan: Plan;
  name: string;
  contributions: number;
  status: PlanYearStatus;
}
export type StrictFormValues = FormValues & {
  plan?: Plan;
  status?: ClaimStatus;
  payrollFrequency?: PayrollFrequency | '';
  endDate?: string | undefined;
  startDate?: string | undefined;
};
export interface ResponseConfig<T> {
  user?: T;
  users?: T;
  employer?: T;
  employers?: T;
  claim?: T;
  planYear?: T;
  planYears?: T;
  message: string;
}
export enum AlertSeverity {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
export enum InputTypes {
  text = 'text',
  password = 'password',
  number = 'number',
}
