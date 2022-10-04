import { Container } from '@mui/material';
import { BasicTabs, EmployerHeader, EmployerHome } from 'components';
import { Outlet, useParams } from 'react-router';

const OutletWithHeader = (): JSX.Element => (
  <>
    <EmployerHeader />
    <Outlet />
  </>
);

const AdminPortal = (): JSX.Element => {
  const { employerId } = useParams();
  return (
    <Container>
      <BasicTabs
        tabLabels={['Employer', 'Claims']}
        tabComponents={[
          !employerId ? <EmployerHome /> : <OutletWithHeader />,
          <>Claims Placeholder</>,
        ]}
      />
    </Container>
  );
};

export default AdminPortal;
