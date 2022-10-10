import { Button, Grid, MenuItem, Typography } from '@mui/material';
import {
  BasicDatePicker,
  BasicSelect,
  ClaimData,
  Prompt,
  TextInput
} from 'components';
import { FormikProps, useFormik } from 'formik';
import { checkIfOnlyNumbers, updateClaim } from 'helpers';
import { Claim, Plan, StrictFormValues } from 'interfaces';
import * as Yup from 'yup';

interface EditClaimFormProps {
  claim: Claim;
}

const validationSchema = Yup.object().shape({
  date: Yup.date().nullable().required(),
  amount: Yup.string()
    .required('Please enter the amount')
    .test(
      'Numbers only',
      'Please use only numbers',
      (value) => !!value && checkIfOnlyNumbers(value)
    ),
});

const EditClaimForm = ({ claim }: EditClaimFormProps): JSX.Element => {
  const initialValues: StrictFormValues = {
    date: claim.date,
    plan: claim.plan,
    amount: claim.amount,
  };
  const onSubmit = async (values: StrictFormValues) => {
    try {
      await updateClaim(claim.id, values);
    } catch (error) {
      console.error(error);
    }
  };
  const formik: FormikProps<StrictFormValues> = useFormik<StrictFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { dirty, handleSubmit, isValid } = formik;

  return (
    <>
      <Prompt formIsDirty={dirty} />
      <Grid container rowSpacing={2} direction="column" pl={10}>
        <Grid item mb={3}>
          <Typography variant="h6">
            <b>Claim number:</b> {claim.claimNumber}
          </Typography>
        </Grid>
        <Grid item>
          <ClaimData claim={claim} rowsToDisplay={2} />
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} direction="column" px={10} pb={10}>
          <Grid item>
            <BasicDatePicker date={claim.date} formik={formik} />
          </Grid>
          <Grid item>
            <BasicSelect name="plan" formik={formik}>
              <MenuItem value={Plan.dental}>Dental</MenuItem>
              <MenuItem value={Plan.medical}>Medical</MenuItem>
            </BasicSelect>
          </Grid>
          <Grid item>
            <TextInput name="amount" formik={formik} />
          </Grid>
          <Grid item mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default EditClaimForm;
