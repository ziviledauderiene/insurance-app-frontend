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
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  userType?: UserTypes;
  id?: string;
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
export interface Claim {
  id: string;
  claimNumber: string;
  employer: string;
  consumer: string;
  date: string;
  plan: Plan;
  amount: string;
  status: ClaimStatus;
}
export enum DialogAction {
  approve = 'approve',
  deny = 'deny',
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
};
