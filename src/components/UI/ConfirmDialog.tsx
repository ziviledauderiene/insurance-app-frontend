import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DialogAction } from 'interfaces';

interface ConfirmDialogProps {
  dialogIsOpen: boolean;
  action: DialogAction | undefined;
  handleConfirm: () => Promise<void>;
  handleDialogClose: () => void;
  label: string;
}

const ConfirmDialog = ({
  dialogIsOpen,
  action,
  handleConfirm,
  handleDialogClose,
  label,
}: ConfirmDialogProps) => (
  <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
    <DialogTitle>
      Are you sure to {action} this {label}?
    </DialogTitle>
    <DialogActions>
      <Button onClick={handleConfirm}>Confirm</Button>
      <Button onClick={handleDialogClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
