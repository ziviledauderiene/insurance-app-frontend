import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Claim, ClaimStatus, Portals } from 'interfaces';
import { NavigateFunction, useNavigate } from 'react-router';
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
const bodyCellStyles = (status: ClaimStatus) => (status === ClaimStatus.pending) ? { sx: { paddingLeft: '50px', '&:hover': { fontWeight: '700', cursor: 'pointer', } } }
  : { sx: { paddingLeft: '50px' } }

const rowStyles = {
  sx: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': { background: theme.palette.action.hover },
  },
};

const ClaimsTable = ({
  claimList,
  loading,
  error,
}: ClaimsTableProps): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const headerTitles = [
    'Claim Number',
    'Amount',
    'Consumer',
    'Date of Service',
    'Plan',
    'Status'
  ];
  const headerList = headerTitles.map((title) => (
    <TableCell {...headCellStyles} key={title}>{title}</TableCell>
  ));
  const clickHandler = (claimNumber: string) => navigate(`/${Portals.admin}/claims/${claimNumber}`);

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
                    <TableCell key={claimItem} {...bodyCellStyles(claim.status)} onClick={() => { if (claim.status === ClaimStatus.pending) { clickHandler(claim.claimNumber) } }}>{claimItem}</TableCell>
                  ))}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card >
  );
};

export default ClaimsTable;
