/* eslint-disable import/prefer-default-export */
import { endpoints } from 'consts';
import { Employer, FormValues } from 'interfaces';
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
  const { employerUser } = await sendRequest(
    endpoints.employers,
    'POST',
    postdata
  );
  return employerUser;
};

export const getEmployer = async (id: string): Promise<Employer> => {
  const { employer } = await sendRequest(`${endpoints.employers}/${id}`);
  return employer;
};
