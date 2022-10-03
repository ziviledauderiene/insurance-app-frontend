import { getUsersByEmployer } from 'helpers/api';
import { User } from 'interfaces';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UsersTable from './UsersTable';

const EmployerUsersManager = (): JSX.Element => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { employerId } = useParams()

  useEffect(() => {
    if (employerId) {
      (async () => {
        try {
          setLoading(true);
          const users = await getUsersByEmployer(employerId)
          setUsersList(users)
        } catch (err) {
          setError(`Could not get users. Error: ${err}`)
        } finally {
          setLoading(false)
        }
      })();
    }
  }, [])

  return <UsersTable employersUsersList={usersList} loading={loading} error={error} />;
};

export default EmployerUsersManager;
