import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { EmployerUserForm, EmployerHeader, BasicModal } from 'components';
import { AdminPages, FormActions, Portals } from 'interfaces';
import { Link } from 'react-router-dom';

const buttons = [
  { link: `${AdminPages.profile}`, label: 'Manage Profile' },
  { link: `${AdminPages.users}`, label: 'Manage Users' },
  { link: `${AdminPages.rules}`, label: 'Manage Rules' },
];

const EmployerSetup = (): JSX.Element => (
  <Container>
    <EmployerHeader />
    <Card elevation={0} variant="outlined">
      <Box sx={{ display: 'flex' }}>
        <Grid container direction="column" m={5}>
          <Grid item key="Employer Setup" mb={2}>
            <Typography variant="h6">Employer Setup</Typography>
          </Grid>
          {buttons.map(({ link, label }) => (
            <Grid item key={label}>
              <Link to={link} style={{ textDecoration: 'none' }}>
                <Button>{label}</Button>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="column" m={5}>
          <Grid item mb={2}>
            <Typography variant="h6">Plan Setup</Typography>
          </Grid>
          <Grid item>
            <Link
              to={`/${Portals.admin}/${AdminPages.plans}`}
              style={{ textDecoration: 'none' }}
            >
              <Button>Manage Plans</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
    <BasicModal label="Add new User">
      <EmployerUserForm
        action={FormActions.addUser}
        // userId="a3bba266-1844-423a-98f8-90117e1f7f22"
      />
    </BasicModal>
  </Container>
);

export default EmployerSetup;
