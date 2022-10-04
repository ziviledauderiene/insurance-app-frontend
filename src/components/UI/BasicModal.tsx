import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, Container, Modal } from '@mui/material';
import { useState } from 'react';

interface BasicModalProps {
  children: JSX.Element;
  label: string | JSX.Element;
}

const BasicModal = ({ children, label }: BasicModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => setIsOpen(!isOpen);

  const buttonStyles: {
    variant: 'contained' | 'text' | 'outlined';
    sx?: { m: string };
  } =
    typeof label === 'string'
      ? {
          variant: 'contained',
          sx: { m: '30px' },
        }
      : { variant: 'text' };

  return (
    <>
      <Button onClick={handleClose} color="secondary" {...buttonStyles}>
        {label}
      </Button>
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <Container>
            <Card>
              <Button
                onClick={handleClose}
                variant="text"
                sx={{ float: 'right', m: '10px' }}
              >
                Close
                <CloseIcon />
              </Button>
              {children}
            </Card>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default BasicModal;
