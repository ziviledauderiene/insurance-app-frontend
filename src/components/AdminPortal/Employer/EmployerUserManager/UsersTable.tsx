import { Delete, Edit } from '@mui/icons-material';
import {
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BasicModal, ConfirmDialog, EmployerUserForm } from 'components';
import { deleteUser } from 'helpers';
import { DialogAction, FormActions, User } from 'interfaces';
import { useState } from 'react';

interface EmployersUserProps {
  employersUsersList: User[];
  loading: boolean;
  error: string | null;
  onSuccess: (message: string) => void;
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

const headerTitles = ['First Name', 'Last Name', 'Email', 'Actions'];
const headerList = headerTitles.map((title) => (
  <TableCell {...headCellStyles} key={title}>
    {title}
  </TableCell>
));

const UsersTable = ({
  employersUsersList,
  loading,
  error,
  onSuccess,
}: EmployersUserProps): JSX.Element => {
  const [dialogIsOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    undefined
  );
  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedUserId(id);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const deleteHandler = async (id: string) => {
    try {
      await deleteUser(id);
      setDialogOpen(false);
      onSuccess('User deleted successfully');
    } catch (err) {
      console.error(err);
    }
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
                    <TableCell {...bodyCellStyles} id={user.id}>
                      {user.firstName}
                    </TableCell>
                    <TableCell {...bodyCellStyles}>{user.lastName}</TableCell>
                    <TableCell {...bodyCellStyles}>{user.email}</TableCell>
                    <TableCell>
                      <BasicModal label={<Edit />}>
                        <EmployerUserForm
                          action={FormActions.update}
                          userId={user.id}
                          onSuccess={onSuccess}
                        />
                      </BasicModal>
                      <IconButton
                        color="error"
                        onClick={() => handleDialogOpen(user.id)}
                      >
                        <Delete />
                      </IconButton>
                      {selectedUserId && (
                        <ConfirmDialog
                          action={DialogAction.delete}
                          dialogIsOpen={dialogIsOpen}
                          handleConfirm={() => deleteHandler(selectedUserId)}
                          handleDialogClose={handleDialogClose}
                          label="User"
                        />
                      )}
                    </TableCell>
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
