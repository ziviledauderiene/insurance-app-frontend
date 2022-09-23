import { Container, Typography } from '@mui/material';
import { BasicTabs, EmployerHome } from 'components';

const AdminPortal = (): JSX.Element => (
  <Container>
    <Typography variant="h5" my={5}>
      Home
    </Typography>
    <BasicTabs
      tabLabels={['Employer', 'Claims']}
      tabComponents={[<EmployerHome />, <>Claims placeholder</>]}
    />
  </Container>
);

export default AdminPortal;
