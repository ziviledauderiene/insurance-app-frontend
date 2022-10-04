import { Button, Card, Grid, Typography } from '@mui/material';
import { getEmployer } from 'helpers';
import { Portals } from 'interfaces';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmployerHeader = (): JSX.Element => {
  const { employerId } = useParams();
  const [employerName, setEmployerName] = useState<string>('');

  useEffect(() => {
    if (employerId) {
      (async () => {
        try {
          const { name, code } = await getEmployer(employerId);
          setEmployerName(`${name}, ${code}`);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      })();
    }
  }, []);

  return (
    <Card elevation={0} variant="outlined" sx={{ my: '50px' }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" m={5}>
            Employer Administration for <b>{employerName}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Link to={`/${Portals.admin}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ m: '20px' }}>Select a different Employer</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};
export default EmployerHeader;
