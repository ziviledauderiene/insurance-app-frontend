import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Grid, MenuItem, Typography } from '@mui/material';
import { BasicSelect, SearchInput } from 'components';
import { FormikProps, useFormik } from 'formik';
import { capitalize } from 'helpers';
import { FormValues } from 'interfaces';
import { Dispatch, useState } from 'react';

const initialValues: FormValues = {
  claimNumber: '',
  status: '',
};
interface SearchBarProps {
  setSearchValues: Dispatch<React.SetStateAction<FormValues | undefined>>;
}

const SearchBar = ({ setSearchValues }: SearchBarProps): JSX.Element => {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values) => {
      setSearchValues(values);
    },
  });
  const { handleSubmit } = formik;

  const selectValues = ['All Claims', 'approved', 'pending', 'denied'];
  const listMenu = selectValues.map((selectItem) => (
    <MenuItem value={selectItem} key={selectItem}>
      {capitalize(selectItem)}
    </MenuItem>
  ));

  return (
    <Card variant="outlined" elevation={0} sx={{ mb: '30px' }}>
      <Typography variant="h6" m={3}>
        Search Claims
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container display="flex" justifyContent="space-around" p={3}>
          <Grid item width="50%">
            <SearchInput
              formik={formik}
              name="claimNumber"
              setDisableButton={setDisableButton}
            />
          </Grid>
          <Grid item width="40%">
            <BasicSelect
              formik={formik}
              name="status"
              setDisableButton={setDisableButton}
            >
              {listMenu}
            </BasicSelect>
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
