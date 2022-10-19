import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { AddEmployerForm, SnackBarNote } from 'components';
import BasicModal from 'components/UI/BasicModal';
import { AdminPages, AlertSeverity, FormActions } from 'interfaces';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerSetup = (): JSX.Element => {
  const [snackIsOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [severity, setSeverity] = useState<AlertSeverity | undefined>();

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const onSuccess = (message: string) => {
    setSnackMessage(message);
    setSeverity(AlertSeverity.success);
    setSnackOpen(true);
  };

  return (
    <Container>
      <Card elevation={0} variant="outlined">
        <Box sx={{ display: 'flex' }}>
          <Grid container direction="column" m={5}>
            <Grid item key="Employer Setup" mb={2}>
              <Typography variant="h6">Employer Setup</Typography>
            </Grid>
            <Grid item key="profile">
              <BasicModal label={<>Manage Profile</>}>
                <AddEmployerForm
                  action={FormActions.update}
                  onSuccess={onSuccess}
                />
              </BasicModal>
            </Grid>
            <Grid item>
              <Link
                to={`${AdminPages.users}`}
                style={{ textDecoration: 'none' }}
              >
                <Button>Manage Users</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container direction="column" m={5}>
            <Grid item mb={2}>
              <Typography variant="h6">Plan Setup</Typography>
            </Grid>
            <Grid item>
              <Link
                to={`${AdminPages.plans}`}
                style={{ textDecoration: 'none' }}
              >
                <Button>Manage Plans</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <SnackBarNote
        snackMessage={snackMessage}
        snackIsOpen={snackIsOpen}
        handleSnackClose={handleSnackClose}
        severity={severity}
      />
    </Container>
  );
};

export default EmployerSetup;
