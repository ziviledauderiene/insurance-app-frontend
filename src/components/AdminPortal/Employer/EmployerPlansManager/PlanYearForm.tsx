import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import { BasicDatePicker, BasicSelect, Prompt, TextInput } from 'components';
import { FormikProps, useFormik } from 'formik';
import {
  addPlanYearValidationSchema,
  capitalize,
  createPlanYear,
  updatePlanYear,
  updatePlanYearValidationSchema,
} from 'helpers';
import {
  FormActions,
  PayrollFrequency,
  Plan,
  PlanYear,
  PlanYearStatus,
  StrictFormValues,
} from 'interfaces';

interface PlanYearFormProps {
  action: FormActions;
  employerId: string | undefined;
  planYear?: PlanYear;
  onSuccess: (message: string) => void;
  handleClose?: () => void;
}
const today = new Date();

const initialEmptyValues: StrictFormValues = {
  name: '',
  startDate: today.toLocaleDateString(),
  endDate: '',
  payrollFrequency: '',
  contributions: '',
};

const PlanYearForm = ({
  action,
  employerId,
  planYear,
  onSuccess,
  handleClose,
}: PlanYearFormProps): JSX.Element => {
  const initialValues = planYear
    ? {
        startDate: planYear.startDate.toLocaleString(),
        endDate: planYear.endDate.toLocaleString(),
        payrollFrequency: planYear.payrollFrequency,
        contributions: planYear.contributions.toString(),
      }
    : initialEmptyValues;

  const onSubmit = async (values: StrictFormValues) => {
    try {
      let message = '';
      if (action === FormActions.add && employerId) {
        const data =
          values.endDate === null || values.endDate === ''
            ? {
                ...values,
                status: PlanYearStatus.notInitialized,
                endDate: undefined,
              }
            : {
                ...values,
                status: PlanYearStatus.notInitialized,
              };
        const response = await createPlanYear(data, employerId);
        message = response.message;
      }
      if (action === FormActions.update && planYear) {
        const response = await updatePlanYear(planYear.id, values);
        message = response.message;
      }
      onSuccess(message);
      if (handleClose) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formik: FormikProps<StrictFormValues> = useFormik<StrictFormValues>({
    initialValues,
    validationSchema:
      action === FormActions.add
        ? addPlanYearValidationSchema
        : updatePlanYearValidationSchema,
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
            {action === FormActions.add ? (
              <BasicSelect name="plan" formik={formik}>
                <MenuItem value={Plan.dental}>Dental</MenuItem>
                <MenuItem value={Plan.medical}>Medical</MenuItem>
              </BasicSelect>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Typography paragraph sx={{ width: '17%' }}>
                  <b>Plan: </b>
                </Typography>
                <Typography paragraph>
                  {planYear && capitalize(planYear.plan)}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item>
            {action === FormActions.add ? (
              <TextInput name="name" formik={formik} />
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Typography paragraph sx={{ width: '17%' }}>
                  <b>Name: </b>
                </Typography>
                <Typography paragraph>
                  {planYear && capitalize(planYear.name)}
                </Typography>
              </Box>
            )}
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
              disabled={
                action === FormActions.add ? !(isValid && dirty) : !isValid
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

PlanYearForm.defaultProps = {
  planYear: undefined,
  handleClose: undefined,
};

export default PlanYearForm;
