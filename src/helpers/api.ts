/* eslint-disable import/prefer-default-export */
import { endpoints } from 'consts';
import { Employer, FormValues, EmployerUser} from 'interfaces';
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

export const createEmployer = async (postdata: FormValues): Promise<EmployerUser> => {
  const { employerUser } = await sendRequest(endpoints.employers, 'POST', postdata);
  return employerUser;
}
