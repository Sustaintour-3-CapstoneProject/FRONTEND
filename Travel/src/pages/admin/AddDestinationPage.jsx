import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Checkbox, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import PlainCard from "../../components/Admin/PlainCard";
import Dropzone from "../../components/Admin/Dropzone";
import LabelInput from "../../components/Admin/LabelInput";
import axiosInstance from "../../api/axiosInstance";

const DetailDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const availableFacilities = [
    "Toilets",
    "Parking Area",
    "Food Stalls",
    "Souvenir Shops",
  ];

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/destination/${id}`);
        const destinationData = response.data.destination;
        setData(destinationData);
        setCity(destinationData.city);
        setEditedData({
          ...destinationData,
          facilities: new Set(destinationData.facilities || []),
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setEditedData((prev) => {
      const updatedFacilities = new Set(prev.facilities);
      if (updatedFacilities.has(facility)) {
        updatedFacilities.delete(facility);
      } else {
        updatedFacilities.add(facility);
      }
      return { ...prev, facilities: updatedFacilities };
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...editedData,
        facilities: Array.from(editedData.facilities),
      };
      await axiosInstance.put(`/destination/${id}`, updatedData);
      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  return (
    <div>
      <PlainCard
        className="py-2"
        title="Detail Destination"
        description="View and Edit Destination Details"
      />
      <div className="flex flex-col md:flex-row gap-5 my-5 bg-white rounded-3xl shadow-lg p-6">
        <div className="flex flex-col gap-6 w-1/2">
          {data.images?.map((image, index) =>
            isEditing ? (
              <LabelInput
                key={index}
                label={`Image Link ${index + 1}`}
                labelValue={`image-${index}`}
                type="text"
                value={editedData.images[index]?.url || ""}
                onChange={(e) => {
                  const updatedImages = [...editedData.images];
                  updatedImages[index].url = e.target.value;
                  handleEditChange("images", updatedImages);
                }}
              />
            ) : (
              <img
                key={index}
                src={image.url}
                alt={`Destination image ${index + 1}`}
                className="w-full h-64"
              />
            )
          )}
        </div>
        <div className="w-full space-y-6">
          <div className="w-full flex flex-row gap-6">
            <LabelInput
              label="Destination Name"
              labelValue="destination"
              type="text"
              value={isEditing ? editedData.name : data.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              disabled={!isEditing}
            />
            <LabelInput
              label="Category"
              labelValue="category"
              type="text"
              value={isEditing ? editedData.category : data.category}
              onChange={(e) => handleEditChange("category", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full flex flex-row gap-6">
            <LabelInput
              label="Operating Hours"
              labelValue="operational_hours"
              type="text"
              value={
                isEditing
                  ? editedData.operational_hours
                  : data.operational_hours
              }
              onChange={(e) =>
                handleEditChange("operational_hours", e.target.value)
              }
              disabled={!isEditing}
            />
            <LabelInput
              label="Entrance Ticket Price"
              labelValue="ticket_price"
              type="text"
              value={isEditing ? editedData.ticket_price : data.ticket_price}
              onChange={(e) => handleEditChange("ticket_price", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full flex flex-row gap-6">
            <LabelInput
              label="Destination Address"
              labelValue="address"
              type="text"
              value={isEditing ? editedData.address : data.address}
              onChange={(e) => handleEditChange("address", e.target.value)}
              disabled={!isEditing}
            />
            <LabelInput
              label="Destination Description"
              labelValue="description"
              type="text"
              value={isEditing ? editedData.description : data.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2">Facilities</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
              {availableFacilities.map((facility) => (
                <div className="space-x-3" key={facility}>
                  <Checkbox
                    id={`facility-${facility}`}
                    checked={editedData.facilities?.has(facility)}
                    onChange={() => handleFacilityChange(facility)}
                    disabled={!isEditing}
                  />
                  <Label htmlFor={`facility-${facility}`} className="text-base">
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-white py-2 px-4 rounded-lg bg-green-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white py-2 px-4 rounded-lg bg-yellow-500"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleBack}
          className="text-white py-2 px-4 rounded-lg bg-blue-500"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailDestination;
