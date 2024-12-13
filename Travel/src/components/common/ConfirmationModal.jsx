import React from "react";
import { Modal, Button } from "flowbite-react";

const ConfirmationModal = ({
  icon,
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal show={isOpen} onClose={onCancel}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="text-center">{icon}</div>
          </div>
        )}
        <p className="text-sm text-gray-700 text-center">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex  gap-2 w-full">
          <Button color="customBlue" onClick={onConfirm}>
            OK
          </Button>
          <Button color="gray" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
