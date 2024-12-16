import React from "react";
import { Modal, Button } from "flowbite-react";
import {
  HiLocationMarker,
  HiOutlineArrowsExpand,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiX,
} from "react-icons/hi";

const RouteDetailModal = ({ isOpen, onClose, routeDetail }) => {
  return (
    <Modal show={isOpen} onClose={onClose} size="lg" popup>
      {/* Header Modal */}
      <Modal.Header className="border-b border-gray-300 bg-sky-500 text-white rounded-t-lg">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <HiLocationMarker className="text-white" />
          <span className="text-white">Route Details</span>
        </div>
      </Modal.Header>

      {/* Body Modal */}
      <Modal.Body className="bg-gray-50 rounded-b-lg">
        <div className="space-y-6 text-gray-700">
          {/* Origin and Destination */}
          <div className="flex items-center mt-3 gap-4 bg-white p-4 rounded-md shadow">
            <HiLocationMarker className="text-3xl text-sky-600" />
            <div>
              <p className="text-lg font-medium">
                <span className="text-gray-500">From: </span>
                <span className="text-gray-800 font-semibold">
                  {routeDetail?.originCityName || "Unknown"}
                </span>
              </p>
              <p className="text-lg font-medium">
                <span className="text-gray-500">To: </span>
                <span className="text-gray-800 font-semibold">
                  {routeDetail?.destinationCityName || "Unknown"}
                </span>
              </p>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow">
            <HiOutlineArrowsExpand className="text-3xl text-sky-600" />
            <p className="text-lg font-medium">
              Distance:{" "}
              <span className="text-gray-800 font-semibold">
                {routeDetail?.distance?.toFixed(2) || "0.00"} km
              </span>
            </p>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow">
            <HiOutlineClock className="text-3xl text-sky-600" />
            <p className="text-lg font-medium">
              Time:{" "}
              <span className="text-gray-800 font-semibold">
                {routeDetail?.time || "0"}
              </span>
            </p>
          </div>

          {/* Cost */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow">
            <HiOutlineCurrencyDollar className="text-3xl text-sky-600" />
            <p className="text-lg font-medium">
              Cost:{" "}
              <span className="text-gray-800 font-semibold">
                Rp. {routeDetail?.cost.toLocaleString() || "0"}
              </span>
            </p>
          </div>
        </div>
      </Modal.Body>

      {/* Footer Modal */}
      <Modal.Footer className="border-t border-gray-200 bg-gray-50">
        <Button onClick={onClose} color="customBlue">
          <span>Close</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RouteDetailModal;
