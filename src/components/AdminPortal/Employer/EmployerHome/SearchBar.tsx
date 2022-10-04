import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Grid, Typography } from '@mui/material';
import { SearchInput } from 'components';
import { FormikProps, useFormik } from 'formik';
import { getEmployers } from 'helpers';
import { Employer, FormValues } from 'interfaces';
import { Dispatch, SetStateAction, useState } from 'react';

const initialValues: FormValues = {
  name: '',
  code: '',
};
interface SearchBarProps {
  setEmployersList: Dispatch<SetStateAction<Employer[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

const SearchBar = ({
  setEmployersList,
  setLoading,
  setError,
}: SearchBarProps): JSX.Element => {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setDisableButton(true);
        setError(null);
        const employers: Employer[] = await getEmployers(values);
        setEmployersList(employers);
      } catch (err) {
        setEmployersList([]);
        setError(`Could not fetch employers. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    },
  });
  const { handleSubmit } = formik;

  return (
    <Card variant="outlined" elevation={0} sx={{ mb: '30px' }}>
      <Typography variant="h6" m={3}>
        Search Employers
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container display="flex" justifyContent="space-around" p={3}>
          <Grid item width="50%">
            <SearchInput
              formik={formik}
              name="name"
              setDisableButton={setDisableButton}
            />
          </Grid>
          <Grid item width="30%">
            <SearchInput
              formik={formik}
              name="code"
              setDisableButton={setDisableButton}
            />
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disableElevation
              disabled={disableButton}
              sx={{ borderRadius: '50%', width: '60px', height: '60px' }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default SearchBar;
