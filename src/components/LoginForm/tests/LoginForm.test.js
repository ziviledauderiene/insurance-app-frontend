import { render, screen } from '@testing-library/react';
import { LoginForm } from 'components';
import { expect, test } from '@jest/globals';

test('button is disabled initially', () => {
  render(<LoginForm />);
  const loginButton = screen.getByRole('button', { name: /log in/i });
  expect(loginButton).toBeDisabled();
});
