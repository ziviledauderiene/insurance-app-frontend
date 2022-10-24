import { Container, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { BaseForm } from 'components';
import { FormikHelpers } from 'formik';
import {
  addUserValidation,
  createEmployerUser,
  getFriendlyErrorOrFallback,
  getUser,
  updateEmployerUser,
  updateUserValidation,
} from 'helpers';
import { FormActions, FormNames, FormValues, UserTypes } from 'interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface EmployerUserFormProps {
  action: FormActions;
  userId?: string;
  handleClose?: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}
const initialValues: FormValues = {
  [FormNames.firstName]: '',
  [FormNames.lastName]: '',
  [FormNames.email]: '',
  [FormNames.username]: '',
  [FormNames.password]: '',
};
const updateUserFields: FormNames[] = [
  FormNames.firstName,
  FormNames.lastName,
  FormNames.email,
  FormNames.username,
];
const addUserFields = [
  FormNames.firstName,
  FormNames.lastName,
  FormNames.email,
  FormNames.username,
  FormNames.password,
];

const EmployerUserForm = ({
  action,
  userId,
  handleClose,
  onSuccess,
  onError,
}: EmployerUserFormProps): JSX.Element => {
  const { employerId } = useParams();
  const [formValues, setFormValues] = useState<FormValues | undefined>(
    undefined
  );

  const fieldNames =
    action === FormActions.add ? addUserFields : updateUserFields;
  const validationSchema =
    action === FormActions.add ? addUserValidation : updateUserValidation;

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const user = await getUser(userId);
          const prefillValues = user as unknown as FormValues;
          setFormValues(prefillValues);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  const onSubmit = async (
    values: FormValues,
    { setFieldError }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      const data = employerId && {
        ...values,
        employer: employerId,
        userType: UserTypes.employer,
      };
      let message = '';
      if (action === FormActions.add) {
        if (data) {
          const response = await createEmployerUser(data);
          message = response.message;
        }
      }
      if (action === FormActions.update) {
        if (data && userId) {
          const response = await updateEmployerUser(values, userId);
          message = response.message;
        }
      }
      if (handleClose) {
        handleClose();
      }
      onSuccess(message);
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 400
      ) {
        setFieldError(
          FormNames.username,
          `Username "${values.username}" already exists. Please choose a different one.`
        );
      }
      onError(getFriendlyErrorOrFallback(error));
    }
  };

  return (
    <Container>
      <Typography variant="h6" ml={10} mt={5} mb={-5}>
        {action === FormActions.add ? 'Add new' : 'Update'} User
      </Typography>
      <BaseForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        prefillValues={formValues}
        validationSchema={validationSchema}
        fieldNames={fieldNames}
        addPrompt
        generatePasswordButton={action === FormActions.add}
      />
    </Container>
  );
};

EmployerUserForm.defaultProps = {
  userId: undefined,
  handleClose: undefined,
};

export default EmployerUserForm;
