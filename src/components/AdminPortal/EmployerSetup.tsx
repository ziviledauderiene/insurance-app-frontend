/* eslint-disable no-unused-expressions */
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { EmployerHeader } from 'components';
import { AdminPages, Portals } from 'interfaces';
import { Link } from 'react-router-dom';

const EmployerSetup = (): JSX.Element => (
  <Container>
    <EmployerHeader />
    <Card elevation={0} variant="outlined">
      <Box sx={{ display: 'flex' }}>
        <Grid container direction="column" m={5}>
          <Grid item key="Employer Setup" mb={2}>
            <Typography variant="h6">Employer Setup</Typography>
          </Grid>
          <Grid item>
            <Link
              to={`${AdminPages.profile}`}
              style={{ textDecoration: 'none' }}
            >
              <Button>Manage Profile</Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to={`${AdminPages.users}`} style={{ textDecoration: 'none' }}>
              <Button>Manage Users</Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to={`${AdminPages.rules}`} style={{ textDecoration: 'none' }}>
              <Button>Manage Rules</Button>
            </Link>
          </Grid>
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
  </Container>
);

export default EmployerSetup;
