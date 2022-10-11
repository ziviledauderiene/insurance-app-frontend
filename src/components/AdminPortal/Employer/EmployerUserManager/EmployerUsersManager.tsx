import { Container } from '@mui/material';
import { BasicModal, EmployerUserForm, UsersTable } from 'components';
import { getUsersByEmployer } from 'helpers';
import { FormActions, User } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EmployerUsersManager = (): JSX.Element => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
  }, []);

  return (
    <Container>
      <BasicModal label="Add new User">
        <EmployerUserForm action={FormActions.add} />
      </BasicModal>
      <UsersTable
        employersUsersList={usersList}
        loading={loading}
        error={error}
      />
    </Container>
  );
};

export default EmployerUsersManager;
