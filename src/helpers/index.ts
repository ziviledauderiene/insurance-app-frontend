import {
  createEmployer,
  createEmployerUser,
  createPlanYear,
  deletePlanYear,
  deleteUser,
  getClaim,
  getClaims,
  getEmployer,
  getEmployers,
  getUser,
  getUsersByEmployer,
  initializePlanYear,
  updateClaim,
  updateEmployer,
  updateEmployerUser,
  updatePlanYear,
} from './api';
import getFriendlyErrorOrFallback from './errorhandling';
import generatePassword from './generatePassword';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
} from './localStorage';
import sendRequest from './sendRequest';
import {
  capitalize,
  checkIfOnlyNumbers,
  replaceCamelWithSpaces,
} from './strings';
import {
  addPlanYearValidationSchema,
  addUserValidation,
  editClaimValidationSchema,
  updatePlanYearValidationSchema,
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
  deletePlanYear,
  initializePlanYear,
  updatePlanYearValidationSchema,
  updatePlanYear,
  getFriendlyErrorOrFallback,
  replaceCamelWithSpaces,
};
