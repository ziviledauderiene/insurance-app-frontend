import { Button, Grid, MenuItem, Typography } from '@mui/material';
import {
  BasicDatePicker,
  BasicSelect,
  ClaimData,
  Prompt,
  TextInput,
} from 'components';
import { FormikProps, useFormik } from 'formik';
import { editClaimValidationSchema, updateClaim } from 'helpers';
import { Claim, Plan, StrictFormValues } from 'interfaces';

interface EditClaimFormProps {
  claim: Claim;
  onSuccess: (message: string) => void;
  handleClose?: () => void;
}

const EditClaimForm = ({
  claim,
  onSuccess,
  handleClose,
}: EditClaimFormProps): JSX.Element => {
  const initialValues: StrictFormValues = {
    date: claim.date,
    plan: claim.plan,
    amount: claim.amount,
  };
  const onSubmit = async (values: StrictFormValues) => {
    try {
      const response = await updateClaim(claim.id, values);
      if (handleClose) {
        handleClose();
      }
      onSuccess(response.message);
    } catch (error) {
      console.error(error);
    }
  };
  const formik: FormikProps<StrictFormValues> = useFormik<StrictFormValues>({
    initialValues,
    validationSchema: editClaimValidationSchema,
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
            <BasicDatePicker
              fieldName="date"
              label="Date of Service"
              formik={formik}
            />
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

EditClaimForm.defaultProps = {
  handleClose: undefined,
};

export default EditClaimForm;
