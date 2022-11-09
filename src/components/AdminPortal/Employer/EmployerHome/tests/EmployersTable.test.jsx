import { render, screen } from '@testing-library/react';
import { endpoints } from 'consts';
import server from 'mocks/server';
import { rest } from 'msw';

import { EmployerHome, EmployersTable } from 'components';
import mockEmployersList from 'mocks/data/mockEmployersList';
import { BrowserRouter } from 'react-router-dom';

test('display list of employers from the server', async () => {
  render(
    <BrowserRouter>
      <EmployersTable employersList={mockEmployersList} />
    </BrowserRouter>
  );

  const employerRows = await screen.findAllByRole('row');
  expect(employerRows).toHaveLength(4);
});

test('handles errors', async () => {
  server.resetHandlers(
    rest.get(
      `${process.env.REACT_APP_API_URL}${endpoints.employers}`,
      (req, res, ctx) => {
        res(ctx.status(500));
      }
    )
  );

  render(
    <BrowserRouter>
      <EmployerHome />
    </BrowserRouter>
  );

  const errorMessage = await screen.findByText(/Could not fetch employers/i);
  expect(errorMessage).toBeInTheDocument();
});
