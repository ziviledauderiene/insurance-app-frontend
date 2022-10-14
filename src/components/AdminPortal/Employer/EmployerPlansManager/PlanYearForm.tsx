import { Button, Container, Grid, MenuItem, Typography } from '@mui/material';
import { BasicDatePicker, BasicSelect, Prompt, TextInput } from 'components';
import { FormikProps, useFormik } from 'formik';
import { addPlanYearValidationSchema, createPlanYear } from 'helpers';
import {
  FormActions,
  PayrollFrequency,
  Plan,
  PlanYearStatus,
  StrictFormValues,
} from 'interfaces';

interface PlanYearFormProps {
  action: FormActions;
  employerId: string | undefined;
}
const today = new Date();

const initialValues: StrictFormValues = {
  name: '',
  startDate: today.toLocaleDateString(),
  endDate: '',
  payrollFrequency: '',
  contributions: '',
};

const PlanYearForm = ({
  action,
  employerId,
}: PlanYearFormProps): JSX.Element => {
  const onSubmit = async (values: StrictFormValues) => {
    if (action === FormActions.add && employerId) {
      try {
        const data =
          values.endDate === ('' || null)
            ? {
                ...values,
                status: PlanYearStatus.notInitialized,
                endDate: undefined,
              }
            : {
                ...values,
                status: PlanYearStatus.notInitialized,
              };
        await createPlanYear(data, employerId);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const formik: FormikProps<StrictFormValues> = useFormik<StrictFormValues>({
    initialValues,
    validationSchema: addPlanYearValidationSchema,
    onSubmit,
  });

  const { dirty, handleSubmit, isValid } = formik;

  return (
    <Container>
      <Prompt formIsDirty={dirty} />
      <Typography variant="h6" ml={10} my={10}>
        {action === FormActions.add ? 'Add new' : 'Update'} Plan Year
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} direction="column" px={10} pb={10}>
          <Grid item>
            <BasicSelect name="plan" formik={formik}>
              <MenuItem value={Plan.dental}>Dental</MenuItem>
              <MenuItem value={Plan.medical}>Medical</MenuItem>
            </BasicSelect>
          </Grid>
          <Grid item>
            <TextInput name="name" formik={formik} />
          </Grid>
          <Grid item>
            <BasicDatePicker
              fieldName="startDate"
              label="Start Date"
              formik={formik}
            />
          </Grid>
          <Grid item>
            <BasicDatePicker
              fieldName="endDate"
              label="End Date"
              formik={formik}
            />
          </Grid>
          <Grid item>
            <TextInput name="contributions" formik={formik} />
          </Grid>
          <Grid item>
            <BasicSelect name="payrollFrequency" formik={formik}>
              <MenuItem value={PayrollFrequency.weekly}>Weekly</MenuItem>
              <MenuItem value={PayrollFrequency.monthly}>Monthly</MenuItem>
            </BasicSelect>
          </Grid>
          <Grid item mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={!(isValid && dirty)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PlanYearForm;
