import React from "react";
import { Modal, Button } from "flowbite-react";

const AlertModal = ({ isOpen, title, message, onClose, icon }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
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
        <Button color="customBlue" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
