import { Container, Typography } from '@mui/material';
import { EmployersTable, SearchBar } from 'components';
import { getEmployers } from 'helpers';
import { Employer } from 'interfaces';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AdminPortal = (): JSX.Element => {
  const [employersList, setEmployersList] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const employers = await getEmployers();
        setEmployersList(employers);
      } catch (err) {
        setError(`Could not fetch employers. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <Typography variant="h5" my={5}>
        Home
      </Typography>
      <SearchBar
        setEmployersList={setEmployersList}
        setLoading={setLoading}
        setError={setError}
      />
      <EmployersTable
        employersList={employersList}
        loading={loading}
        error={error}
      />
      <Outlet />
    </Container>
  );
};

export default AdminPortal;
