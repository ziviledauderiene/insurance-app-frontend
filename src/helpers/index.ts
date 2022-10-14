import {
  createEmployer,
  createEmployerUser,
  createPlanYear,
  deleteUser,
  getClaim,
  getClaims,
  getEmployer,
  getEmployers,
  getUser,
  getUsersByEmployer,
  updateClaim,
  updateEmployer,
  updateEmployerUser,
} from './api';
import generatePassword from './generatePassword';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
} from './localStorage';
import sendRequest from './sendRequest';
import { capitalize, checkIfOnlyNumbers } from './strings';
import {
  addPlanYearValidationSchema,
  addUserValidation,
  editClaimValidationSchema,
  updateUserValidation,
} from './validation';

export {
  sendRequest,
  getEmployers,
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
  capitalize,
  getEmployer,
  createEmployer,
  createEmployerUser,
  updateEmployerUser,
  generatePassword,
  deleteUser,
  getUser,
  getUsersByEmployer,
  getClaim,
  updateClaim,
  checkIfOnlyNumbers,
  getClaims,
  updateEmployer,
  createPlanYear,
  editClaimValidationSchema,
  addPlanYearValidationSchema,
  updateUserValidation,
  addUserValidation,
};
