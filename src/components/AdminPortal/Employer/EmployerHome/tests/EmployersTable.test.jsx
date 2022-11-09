import { render, screen } from '@testing-library/react';

import { EmployersTable } from 'components';
import { BrowserRouter } from 'react-router-dom';
import mockEmployersList from 'mocks/data/mockEmployersList';

test('display list of employers from the server', async () => {
  render(
    <BrowserRouter>
      <EmployersTable employersList={mockEmployersList} />
    </BrowserRouter>
  );

  const employerRows = await screen.findAllByRole('row');
  expect(employerRows).toHaveLength(4);
});
