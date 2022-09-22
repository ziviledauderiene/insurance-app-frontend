import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ReactRouterPrompt from 'react-router-prompt';

interface PromptProps {
  formIsDirty: boolean;
}

const Prompt = ({ formIsDirty }: PromptProps): JSX.Element => (
  <ReactRouterPrompt when={formIsDirty}>
    {({ isActive, onConfirm, onCancel }) => (
      <Dialog open={isActive}>
        <DialogTitle>Are you sure to leave?</DialogTitle>
        <DialogContent>
          You have entered some data that could be lost if you navigate away.
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel}>
            Stay on the page
          </Button>
          <Button onClick={onConfirm}>Leave</Button>
        </DialogActions>
      </Dialog>
    )}
  </ReactRouterPrompt>
);

export default Prompt;
