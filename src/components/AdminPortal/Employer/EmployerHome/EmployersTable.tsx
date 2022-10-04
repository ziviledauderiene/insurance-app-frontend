import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Employer, Portals } from 'interfaces';
import { MouseEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import theme from 'styles';

interface EmployersTableProps {
  employersList: Employer[];
  loading: boolean;
  error: string | null;
}
const headCellStyles = {
  sx: {
    paddingLeft: '50px',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '1.1rem',
    borderBottom: '2px solid',
  },
};
const bodyCellStyles = {
  sx: { paddingLeft: '50px', '&:hover': { fontWeight: '700' } },
};
const rowStyles = {
  sx: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': { cursor: 'pointer', background: theme.palette.action.hover },
  },
};

const EmployersTable = ({
  employersList,
  loading,
  error,
}: EmployersTableProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    const { id } = event.target as HTMLElement;
    navigate(`/${Portals.admin}/employers/${id}`);
  };

  return (
    <Card elevation={0} variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell {...headCellStyles}>Name</TableCell>
              <TableCell {...headCellStyles}>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow key="loading" {...rowStyles}>
                <TableCell {...bodyCellStyles}>Loading...</TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow key="error" {...rowStyles}>
                <TableCell {...bodyCellStyles}>{error}</TableCell>
              </TableRow>
            )}
            {!error && employersList?.length === 0 && (
              <TableRow key="0" {...rowStyles}>
                <TableCell {...bodyCellStyles}>No employers found.</TableCell>
              </TableRow>
            )}
            {employersList.length > 0 &&
              employersList.map((employer) => (
                <TableRow key={employer.id} {...rowStyles}>
                  <TableCell
                    {...bodyCellStyles}
                    width="60%"
                    onClick={(event) => clickHandler(event)}
                    id={employer.id}
                  >
                    {employer.name}
                  </TableCell>
                  <TableCell {...bodyCellStyles} width="40%">
                    {employer.code}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default EmployersTable;
