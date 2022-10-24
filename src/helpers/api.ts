import { endpoints } from 'consts';
import {
  Claim,
  Employer,
  FormValues,
  PlanYear,
  PlanYearStatus,
  ResponseConfig,
  StrictFormValues,
  User,
} from 'interfaces';
import sendRequest from './sendRequest';

export const getEmployers = async (
  queryParams?: FormValues
): Promise<Employer[]> => {
  const query = queryParams
    ? `?name=${queryParams.name}&code=${queryParams.code}`
    : '';
  const { employers } = await sendRequest(`${endpoints.employers}${query}`);
  return employers;
};

export const createEmployer = async (
  postdata: FormValues
): Promise<ResponseConfig<Employer>> => {
  const response = await sendRequest(endpoints.employers, 'POST', postdata);
  return response;
};

export const updateEmployer = async (
  values: FormValues,
  id: string
): Promise<ResponseConfig<Employer>> => {
  const response = await sendRequest(
    `${endpoints.employers}/${id}`,
    'PATCH',
    values
  );
  return response;
};

export const getEmployer = async (id: string): Promise<Employer> => {
  const { employer } = await sendRequest(`${endpoints.employers}/${id}`);
  return employer;
};

export const getUsersByEmployer = async (id: string): Promise<User[]> => {
  const query = id ? `?employer=${id}` : ``;
  const { users } = await sendRequest(`${endpoints.users}${query}`);
  return users;
};

export const createEmployerUser = async (
  data: FormValues
): Promise<ResponseConfig<User>> => {
  const response = await sendRequest(endpoints.users, 'POST', data);
  return response;
};

export const updateEmployerUser = async (
  values: FormValues,
  id: string
): Promise<ResponseConfig<User>> => {
  const response = await sendRequest(
    `${endpoints.users}/${id}`,
    'PATCH',
    values
  );
  return response;
};

export const deleteUser = async (id: string) => {
  await sendRequest(`${endpoints.users}/${id}`, 'DELETE');
};

export const getUser = async (id: string): Promise<User> => {
  const { user } = await sendRequest(`${endpoints.users}/${id}`);
  return user[0];
};

export const getClaim = async (claimNumber: string): Promise<Claim> => {
  const query = `?claimNumber=${claimNumber}`;
  const { claims } = await sendRequest(`${endpoints.claims}${query}`);
  return claims[0];
};

export const updateClaim = async (
  id: string,
  data: Partial<Claim>
): Promise<ResponseConfig<Claim>> => {
  const response = await sendRequest(
    `${endpoints.claims}/${id}`,
    'PATCH',
    data
  );
  return response;
};
export const getClaims = async (
  queryParams?: FormValues,
  page?: number
): Promise<{
  claims: Claim[];
  count: number;
}> => {
  const query = queryParams
    ? `?claimNumber=${queryParams.claimNumber}&status=${queryParams.status}&page=${page}`
    : `?page=${page}`;
  const { claims, count } = await sendRequest(`${endpoints.claims}${query}`);
  return { claims, count };
};
export const getPlanYearsByEmployer = async (
  id: string
): Promise<PlanYear[]> => {
  const query = id ? `?employer=${id}` : ``;
  const { planYears } = await sendRequest(`${endpoints.plans}${query}`);
  return planYears;
};
export const createPlanYear = async (
  data: Omit<StrictFormValues, 'status'> & { status: PlanYearStatus },
  employerId: string
): Promise<ResponseConfig<PlanYear>> => {
  const response = await sendRequest(
    `${endpoints.plans}/${employerId}`,
    'POST',
    data
  );
  return response;
};
export const deletePlanYear = async (id: string) => {
  await sendRequest(`${endpoints.plans}/${id}`, 'DELETE');
};
export const initializePlanYear = async (
  id: string
): Promise<ResponseConfig<PlanYear>> => {
  const response = await sendRequest(
    `${endpoints.plans}/${id}/initialize`,
    'PATCH'
  );
  return response;
};
export const updatePlanYear = async (
  id: string,
  data: StrictFormValues
): Promise<ResponseConfig<PlanYear>> => {
  const response = await sendRequest(`${endpoints.plans}/${id}`, 'PATCH', data);
  return response;
};
