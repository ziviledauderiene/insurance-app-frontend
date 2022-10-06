import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Claim } from 'interfaces';
import theme from 'styles';

interface ClaimsTableProps {
  claimList: Claim[];
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

const ClaimsTable = ({
  claimList,
  loading,
  error,
}: ClaimsTableProps): JSX.Element => {
  const headerTitles = [
    'Claim Number',
    'Amount',
    'Consumer',
    'Date of Service',
    'Plan',
    'Status'
  ];
  const headerList = headerTitles.map((title) => (
    <TableCell {...headCellStyles}>{title}</TableCell>
  ));

  return (
    <Card elevation={0} variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>{headerList}</TableRow>
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
            {!error && claimList?.length === 0 && (
              <TableRow key="0" {...rowStyles}>
                <TableCell {...bodyCellStyles}>No claims found.</TableCell>
              </TableRow>
            )}
            {claimList.length > 0 &&
              claimList.map((claim) => (
                <TableRow key={claim.claimNumber} {...rowStyles}>
                  {Object.values(claim).slice(0, -1).map((claimItem) => (
                    <TableCell key={claimItem} {...bodyCellStyles}>{claimItem}</TableCell>
                  ))}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ClaimsTable;
