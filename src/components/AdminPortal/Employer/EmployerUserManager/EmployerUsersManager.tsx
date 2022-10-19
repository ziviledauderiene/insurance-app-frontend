import { Container } from '@mui/material';
import {
  BasicModal,
  EmployerUserForm,
  SnackBarNote,
  UsersTable,
} from 'components';
import { getUsersByEmployer } from 'helpers';
import { AlertSeverity, FormActions, User } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EmployerUsersManager = (): JSX.Element => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [snackIsOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [severity, setSeverity] = useState<AlertSeverity | undefined>();
  const { employerId } = useParams();

  useEffect(() => {
    if (employerId) {
      (async () => {
        try {
          setLoading(true);
          const users = await getUsersByEmployer(employerId);
          setUsersList(users);
        } catch (err) {
          setError(`Could not get users. Error: ${err}`);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [reload]);

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
    setReload((prevState) => !prevState);
  };

  return (
    <Container>
      <BasicModal label="Add new User">
        <EmployerUserForm action={FormActions.add} onSuccess={onSuccess} />
      </BasicModal>
      <UsersTable
        employersUsersList={usersList}
        loading={loading}
        error={error}
        onSuccess={onSuccess}
      />
      <SnackBarNote
        snackMessage={snackMessage}
        snackIsOpen={snackIsOpen}
        handleSnackClose={handleSnackClose}
        severity={severity}
      />
    </Container>
  );
};

export default EmployerUsersManager;
