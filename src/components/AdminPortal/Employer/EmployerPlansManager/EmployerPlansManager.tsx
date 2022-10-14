import { BasicModal, PlanYearForm, PlanYearsTable } from 'components';
import { getPlanYearsByEmployer } from 'helpers/api';
import { FormActions, PlanYear } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EmployerPlansManager = (): JSX.Element => {
  const { employerId } = useParams();
  const [planYearsList, setPlanYearsList] = useState<PlanYear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employerId) {
      (async () => {
        try {
          setLoading(true);
          const planYears = await getPlanYearsByEmployer(employerId);
          setPlanYearsList(planYears);
        } catch (err) {
          setError(`Could not get Plan Years. Error: ${err}`);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return (
    <>
      <BasicModal label="Add new Plan Year">
        <PlanYearForm action={FormActions.add} employerId={employerId} />
      </BasicModal>
      <PlanYearsTable
        planYearsList={planYearsList}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default EmployerPlansManager;
