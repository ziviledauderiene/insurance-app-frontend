import {
  AddEmployerForm,
  BasicModal,
  EmployersTable,
  SearchBar,
} from 'components';
import { getEmployers } from 'helpers';
import { Employer, FormActions } from 'interfaces';
import { useEffect, useState } from 'react';

const EmployerHome = (): JSX.Element => {
  const [employersList, setEmployersList] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  return (
    <>
      <BasicModal label="Add new Employer">
        <AddEmployerForm action={FormActions.add}/>
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
    </>
  );
};

export default EmployerHome;
