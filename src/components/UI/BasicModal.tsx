import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface BasicModalProps {
  children: JSX.Element
}

const BasicModal = ({children}: BasicModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={handleClick}>Add new employer</Button>
      {isOpen && <Modal
      open={isOpen}
        onClose={handleClick}
      >
      {children}
      </Modal>}
    </div>
  );
}

export default BasicModal