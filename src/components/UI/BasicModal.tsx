import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface BasicModalProps {
  children: JSX.Element;
  label: string;
}

const BasicModal = ({ children, label }: BasicModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={handleClick}
        color="secondary"
        variant="contained"
        sx={{ m: '30px' }}
      >
        {label}
      </Button>
      {isOpen && (
        <Modal open={isOpen} onClose={handleClick}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default BasicModal;
