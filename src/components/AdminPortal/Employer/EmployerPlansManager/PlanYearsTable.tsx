import { Delete, Edit } from '@mui/icons-material';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { BasicModal } from 'components';
import { PlanYear, PlanYearStatus } from 'interfaces';
import { useState } from 'react';
import theme from 'styles';

interface PlanYearsTableProps {
  planYearsList: PlanYear[];
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
  sx: { paddingLeft: '50px' },
};
const rowStyles = {
  sx: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': { background: theme.palette.action.hover },
  },
};

const PlanYearsTable = ({
  planYearsList,
  loading,
  error,
}: PlanYearsTableProps): JSX.Element => {
  const [dialogIsOpen, setDialogOpen] = useState<boolean>(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Card elevation={0} variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell {...headCellStyles}>Plan Year Name</TableCell>
              <TableCell {...headCellStyles}>Status</TableCell>
              <TableCell {...headCellStyles}>Actions</TableCell>
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
            {!error && planYearsList?.length === 0 && (
              <TableRow key="0" {...rowStyles}>
                <TableCell {...bodyCellStyles}>No Plan Years found.</TableCell>
              </TableRow>
            )}
            {planYearsList.length > 0 &&
              planYearsList.map((planYear) => (
                <TableRow key={planYear.id} {...rowStyles}>
                  <TableCell {...bodyCellStyles} width="40%">
                    {planYear.name}
                  </TableCell>
                  <TableCell {...bodyCellStyles} width="25%">
                    {planYear.status}
                  </TableCell>
                  <TableCell
                    {...bodyCellStyles}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button
                      disabled={planYear.status === PlanYearStatus.initialized}
                    >
                      Initialize
                    </Button>
                    <BasicModal
                      label={
                        <>
                          Update <Edit sx={{ mx: '10px' }} />
                        </>
                      }
                    >
                      <div>Update</div>
                    </BasicModal>
                    <Button color="error" onClick={handleDialogOpen}>
                      Remove <Delete />
                    </Button>
                    <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                      <DialogTitle>
                        Are you sure to remove this Plan Year?
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          color="error"
                          id={planYear.id}
                          //   onClick={deleteHandler}
                        >
                          Delete
                        </Button>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PlanYearsTable;
