import { numbersRegEx } from 'consts';

export const capitalize = (word: string): string =>
  word.slice(0, 1).toUpperCase() + word.slice(1);

export const replaceCamelWithSpaces = (word: string) =>
  word.replace(/\B([A-Z])\B/g, ' $1');

export const checkIfOnlyNumbers = (value: string): boolean =>
  numbersRegEx.test(value);
