export const saveInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const deleteFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
export const getFromLocalStorage = (key: string): any =>
  JSON.parse(localStorage.getItem(key)!);
