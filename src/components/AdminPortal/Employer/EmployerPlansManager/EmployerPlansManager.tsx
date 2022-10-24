import {
  BasicModal,
  PlanYearForm,
  PlanYearsTable,
  SnackBarNote,
} from 'components';
import { getPlanYearsByEmployer } from 'helpers/api';
import { AlertSeverity, FormActions, PlanYear } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EmployerPlansManager = (): JSX.Element => {
  const { employerId } = useParams();
  const [planYearsList, setPlanYearsList] = useState<PlanYear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackIsOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string | undefined>();
  const [severity, setSeverity] = useState<AlertSeverity | undefined>();
  const [reload, setReload] = useState<boolean>(false);

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
  const onError = (message: string) => {
    setSnackMessage(message);
    setSeverity(AlertSeverity.error);
    setSnackOpen(true);
  };

  return (
    <>
      <BasicModal label="Add new Plan Year">
        <PlanYearForm
          action={FormActions.add}
          employerId={employerId}
          onSuccess={onSuccess}
          onError={onError}
        />
      </BasicModal>
      <PlanYearsTable
        planYearsList={planYearsList}
        loading={loading}
        error={error}
        onSuccess={onSuccess}
        onError={onError}
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

export default EmployerPlansManager;
