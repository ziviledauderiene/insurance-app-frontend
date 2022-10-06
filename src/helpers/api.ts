import { endpoints } from 'consts';
import { Claim, Employer, FormValues, User } from 'interfaces';
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
): Promise<Employer> => {
  const { employer } = await sendRequest(endpoints.employers, 'POST', postdata);
  return employer;
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

export const createEmployerUser = async (data: FormValues): Promise<User> => {
  const { newUser } = await sendRequest(endpoints.users, 'POST', data);
  return newUser;
};

export const updateEmployerUser = async (
  values: FormValues,
  id: string
): Promise<User> => {
  const { user } = await sendRequest(
    `${endpoints.users}/${id}`,
    'PATCH',
    values
  );
  return user;
};

export const deleteUser = async (id: string) => {
  await sendRequest(`${endpoints.users}/${id}`, 'DELETE');
};

export const getUser = async (id: string): Promise<User> => {
  const { user } = await sendRequest(`${endpoints.users}/${id}`);
  return user[0];
};

export const getClaims = async (
  queryParams?: FormValues
): Promise<Claim[]> => {
  const query = queryParams
    ? `?claimNumber=${queryParams.claimNumber}&status=${queryParams.status}`
    : '';
  const { claims } = await sendRequest(`${endpoints.claims}${query}`);
  return claims;
};