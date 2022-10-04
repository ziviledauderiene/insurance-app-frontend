import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BasicModal, EmployerUserForm } from 'components';
import { deleteUser } from 'helpers';
import { FormActions, User } from 'interfaces';
import { MouseEvent, useState } from 'react';

interface EmployersUserProps {
  employersUsersList: User[];
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
  },
};

const headerTitles = ['Actions', 'First Name', 'Last Name', 'Email'];
const headerList = headerTitles.map((title) => (
  <TableCell {...headCellStyles}>{title}</TableCell>
));

const UsersTable = ({
  employersUsersList,
  loading,
  error,
}: EmployersUserProps): JSX.Element => {
  const [dialogIsOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const deleteHandler = async (event: MouseEvent<HTMLElement>) => {
    const { id } = event.target as HTMLElement;
    await deleteUser(id);
    setDialogOpen(false);
  };

  return (
    <Container>
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
              {!error && employersUsersList?.length === 0 && (
                <TableRow key="0" {...rowStyles}>
                  <TableCell {...bodyCellStyles}>No users found.</TableCell>
                </TableRow>
              )}
              {employersUsersList.length > 0 &&
                employersUsersList.map((user) => (
                  <TableRow key={user.id} {...rowStyles}>
                    <TableCell>
                      <BasicModal label={<Edit />}>
                        <EmployerUserForm
                          action={FormActions.updateUser}
                          userId={user.id}
                        />
                      </BasicModal>
                      <IconButton color="error" onClick={handleDialogOpen}>
                        <Delete />
                      </IconButton>
                      <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                        <DialogTitle>
                          Are you sure to delete this User?
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            color="error"
                            id={user.id}
                            onClick={deleteHandler}
                          >
                            Delete
                          </Button>
                          <Button onClick={handleDialogClose}>Cancel</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell {...bodyCellStyles} id={user.id}>
                      {user.firstName}
                    </TableCell>
                    <TableCell {...bodyCellStyles}>{user.lastName}</TableCell>
                    <TableCell {...bodyCellStyles}>{user.email}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};
export default UsersTable;
