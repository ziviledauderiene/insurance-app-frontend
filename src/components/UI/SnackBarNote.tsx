import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { capitalize } from 'helpers';
import { AlertSeverity } from 'interfaces';

interface SnackNoteProps {
  snackMessage: string | undefined;
  snackIsOpen: boolean;
  handleSnackClose: () => void;
  severity: AlertSeverity | undefined;
}

const SnackBarNote = ({
  snackMessage,
  snackIsOpen,
  handleSnackClose,
  severity,
}: SnackNoteProps): JSX.Element => (
  <Snackbar
    open={snackIsOpen}
    autoHideDuration={6000}
    onClose={handleSnackClose}
  >
    <Alert severity={severity} sx={{ width: '100%' }}>
      <AlertTitle>{severity && capitalize(severity)}</AlertTitle>
      {snackMessage}
    </Alert>
  </Snackbar>
);

export default SnackBarNote;
