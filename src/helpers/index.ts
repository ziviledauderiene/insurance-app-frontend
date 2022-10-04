import {
  createEmployer,
  createEmployerUser, deleteUser, getEmployer,
  getEmployers, getUser,
  getUsersByEmployer, updateEmployerUser
} from './api';
import generatePassword from './generatePassword';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage
} from './localStorage';
import sendRequest from './sendRequest';
import capitalize from './strings';

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
};

