import { describe, expect, test } from '@jest/globals';
import { capitalize, replaceCamelWithSpaces } from 'helpers';

describe('words capitalized', () => {
  test('works if there no capital letters', () => {
    expect(capitalize('name')).toBe('Name');
  });
});

describe('spaces before camel-case capital letters', () => {
  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('payrollFrequency')).toBe(
      'payroll Frequency'
    );
  });
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('YourFirstName')).toBe('Your First Name');
  });
});
