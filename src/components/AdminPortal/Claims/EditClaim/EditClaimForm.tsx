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
import { useState } from 'react';

interface EditClaimFormProps {
  claim: Claim;
}

const EditClaimForm = ({ claim }: EditClaimFormProps): JSX.Element => {
  const [formMessage, setFormMessage] = useState<string>('');
  const initialValues: StrictFormValues = {
    date: claim.date,
    plan: claim.plan,
    amount: claim.amount,
  };
  const onSubmit = async (values: StrictFormValues) => {
    try {
      await updateClaim(claim.id, values);
      setFormMessage(`Claim updated successfully`);
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
        <Typography align="center" mb={3}>
          {formMessage}
        </Typography>
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
export default EditClaimForm;
