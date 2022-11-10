import { render, screen } from 'test-utils/testing-library-utils';
import { endpoints } from 'consts';
import server from 'mocks/server';
import { rest } from 'msw';

import { EmployerHome, EmployersTable } from 'components';
import mockEmployersList from 'mocks/data/mockEmployersList';

test('display list of employers from the server', async () => {
  render(<EmployersTable employersList={mockEmployersList} />);

  const employerRows = await screen.findAllByRole('row');
  expect(employerRows).toHaveLength(4);
});

test('handles errors', async () => {
  server.resetHandlers(
    rest.get(
      `${process.env.REACT_APP_API_URL}${endpoints.employers}`,
      (req, res, ctx) => res(ctx.status(500))
    )
  );

  render(<EmployerHome />);

  const errorMessage = await screen.findByText(/Could not fetch employers/i);
  expect(errorMessage).toBeInTheDocument();
});
