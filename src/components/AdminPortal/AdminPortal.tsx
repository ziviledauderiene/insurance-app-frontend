import { Container } from '@mui/material';
import { BasicTabs, EmployerHeader, EmployerHome, ClaimsHome } from 'components';
import { Outlet, useParams } from 'react-router';

const OutletWithEmplHeader = (): JSX.Element => (
  <>
    <EmployerHeader />
    <Outlet />
  </>
);

const AdminPortal = (): JSX.Element => {
  const { employerId, claimNumber } = useParams();
  return (
    <Container>
      <BasicTabs
        tabLabels={['employers', 'claims']}
        tabComponents={[
          !employerId ? <EmployerHome /> : <OutletWithEmplHeader />,
          !claimNumber ? <ClaimsHome /> : <Outlet />,
        ]}
      />
    </Container>
  );
};

export default AdminPortal;
