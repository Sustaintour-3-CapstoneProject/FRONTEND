import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

const DeleteRouteAlert = ({ isOpen, onClose, onConfirm, routeName }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <div className="flex items-center">
          Confirm Deletion
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div className="mb-4">
            <HiTrash className="mx-auto h-12 w-12 text-red-600" />
          </div>
          <p>Are you sure you want to delete the route "{routeName}"?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={onConfirm}>
          Ok
        </Button>
        <Button color="gray" onClick={onClose}>
          No, cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRouteAlert;