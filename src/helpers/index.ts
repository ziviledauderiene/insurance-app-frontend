import sendRequest from './sendRequest';

export const capitalize = (word: string): string =>
  word.slice(0, 1).toUpperCase() + word.slice(1);
export const saveInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const deleteFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
export const getFromLocalStorage = (key: string): any =>
  JSON.parse(localStorage.getItem(key)!);

export { sendRequest };
