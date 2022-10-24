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
const bodyCellStyles = (status: ClaimStatus) =>
  status === ClaimStatus.pending
    ? {
        sx: {
          paddingLeft: '50px',
          '&:hover': {
            fontWeight: '700',
            cursor: 'pointer',
            color: theme.palette.secondary,
          },
        },
      }
    : { sx: { paddingLeft: '50px' } };

const rowStyles = (status: ClaimStatus) =>
  status === ClaimStatus.pending
    ? {
        sx: {
          background: theme.palette.action.hover,
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': { background: theme.palette.action.focus },
        },
      }
    : {
        sx: {
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': {},
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
    'Status',
  ];

  type Rows = keyof Omit<Claim, 'id' | 'employer'>;
  const rowMap = {
    claimNumber: 0,
    amount: 1,
    consumer: 2,
    date: 3,
    plan: 4,
    status: 5,
  };

  const headerList = headerTitles.map((title) => (
    <TableCell {...headCellStyles} key={title}>
      {title}
    </TableCell>
  ));
  const clickHandler = (claimNumber: string) =>
    navigate(`/${Portals.admin}/claims/${claimNumber}`);

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
              claimList.map((claim) => {
                const childrenItems: string[] = [];
                Object.keys(claim).forEach((key) => {
                  if (key === 'id') {
                    return;
                  }
                  if (key === 'date') {
                    childrenItems[rowMap[key]] = new Date(
                      claim[key]
                    ).toLocaleDateString();
                    return;
                  }
                  const index = rowMap[key as Rows];
                  if (index !== undefined) {
                    childrenItems[rowMap[key as Rows]] = claim[key as Rows];
                  }
                });
                return (
                  <TableRow
                    key={claim.claimNumber}
                    {...rowStyles(claim.status)}
                  >
                    {childrenItems.map((claimItem, index) => (
                      <TableCell
                        key={claimItem}
                        {...bodyCellStyles(claim.status)}
                        onClick={() => {
                          if (claim.status === ClaimStatus.pending) {
                            clickHandler(claim.claimNumber);
                          }
                        }}
                      >
                        {index === 3
                          ? new Date(claimItem).toLocaleDateString()
                          : claimItem}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ClaimsTable;
