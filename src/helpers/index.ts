import { getEmployer, getEmployers } from './api';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage
} from './localStorage';
import sendRequest from './sendRequest';
import { capitalize } from './strings';

export {
  sendRequest,
  getEmployers,
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
  capitalize,
  getEmployer
};