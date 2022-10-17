import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BasicModal, ConfirmDialog } from 'components';
import { deletePlanYear, initializePlanYear } from 'helpers';
import { DialogAction, PlanYear, PlanYearStatus } from 'interfaces';
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
  const [deleteDialogIsOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [initializeDialogIsOpen, setInitializeDialogOpen] =
    useState<boolean>(false);
  const [selectedPlanYearId, setSelectedPlanYearId] = useState<
    string | undefined
  >(undefined);

  const handleDialogOpen = (id: string) => {
    setDeleteDialogOpen(true);
    setSelectedPlanYearId(id);
  };
  const handleInitializeDialogOpen = (id: string) => {
    setInitializeDialogOpen(true);
    setSelectedPlanYearId(id);
  };

  const handleDialogClose = () => setDeleteDialogOpen(false);
  const handleInitializeDialogClose = () => setInitializeDialogOpen(false);

  const initializeHandler = async (id: string) => {
    try {
      await initializePlanYear(id);
      setInitializeDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      await deletePlanYear(id);
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

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
                      onClick={() => handleInitializeDialogOpen(planYear.id)}
                    >
                      Initialize
                    </Button>
                    {selectedPlanYearId && (
                      <ConfirmDialog
                        action={DialogAction.initialize}
                        dialogIsOpen={initializeDialogIsOpen}
                        handleConfirm={() =>
                          initializeHandler(selectedPlanYearId)
                        }
                        handleDialogClose={handleInitializeDialogClose}
                        label="Plan Year"
                      />
                    )}
                    <BasicModal
                      label={
                        <>
                          Update <Edit sx={{ mx: '10px' }} />
                        </>
                      }
                    >
                      <div>Update</div>
                    </BasicModal>
                    <Button
                      color="error"
                      onClick={() => handleDialogOpen(planYear.id)}
                      disabled={planYear.status === PlanYearStatus.initialized}
                    >
                      Remove <Delete />
                    </Button>
                    {selectedPlanYearId && (
                      <ConfirmDialog
                        action={DialogAction.delete}
                        dialogIsOpen={deleteDialogIsOpen}
                        handleConfirm={() => deleteHandler(selectedPlanYearId)}
                        handleDialogClose={handleDialogClose}
                        label="Plan Year"
                      />
                    )}
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
