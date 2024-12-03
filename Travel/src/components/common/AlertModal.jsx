import React from "react";
import { Modal, Button } from "flowbite-react";

const AlertModal = ({ isOpen, title, message, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
