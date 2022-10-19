import {
  AddEmployerForm,
  BasicModal,
  EmployersTable,
  SearchBar,
  SnackBarNote,
} from 'components';
import { getEmployers } from 'helpers';
import { AlertSeverity, Employer, FormActions } from 'interfaces';
import { useEffect, useState } from 'react';

const EmployerHome = (): JSX.Element => {
  const [employersList, setEmployersList] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [snackIsOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [severity, setSeverity] = useState<AlertSeverity | undefined>();

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
    <>
      <BasicModal label="Add new Employer">
        <AddEmployerForm action={FormActions.add} onSuccess={onSuccess} />
      </BasicModal>
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
      <SnackBarNote
        snackMessage={snackMessage}
        snackIsOpen={snackIsOpen}
        handleSnackClose={handleSnackClose}
        severity={severity}
      />
    </>
  );
};

export default EmployerHome;
