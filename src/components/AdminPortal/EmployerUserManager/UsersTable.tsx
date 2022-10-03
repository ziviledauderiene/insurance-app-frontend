import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { MouseEvent, useState } from 'react';
import Edit from '@mui/icons-material/Edit';
import { deleteUser } from 'helpers/api';
import { User } from 'interfaces';

import theme from 'styles';
import Button from '@mui/material/Button';

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
  sx: { paddingLeft: '50px', '&:hover': { fontWeight: '700' } },
};
const rowStyles = {
  sx: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:hover': { cursor: 'pointer', background: theme.palette.action.hover },
  },
};

const deleteHandler = async (event: MouseEvent<HTMLElement>) => {
  const { id } = event.target as HTMLElement;
  await deleteUser(id);
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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
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
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={handleDialogOpen}>
                        <DeleteIcon />
                      </IconButton>
                      <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogActions>
                          <Button
                            color="error"
                            variant="contained"
                            id={user.id}
                            onClick={deleteHandler}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={handleDialogClose}
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell {...bodyCellStyles} width="60%" id={user.id}>
                      {user.firstName}
                    </TableCell>
                    <TableCell {...bodyCellStyles} width="40%">
                      {user.lastName}
                    </TableCell>
                    <TableCell {...bodyCellStyles} width="40%">
                      {user.email}
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
