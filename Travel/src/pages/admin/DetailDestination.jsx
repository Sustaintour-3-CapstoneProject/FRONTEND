import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Checkbox, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import PlainCard from "../../components/Admin/PlainCard";
import LabelInput from "../../components/Admin/LabelInput";
import SelectInput from "../../components/Admin/SelectInput";
import { Button } from "flowbite-react";
import { FaTimes, FaEdit, FaSave, FaPlus } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const availableFacilities = [
  "Toilets",
  "Parking Area",
  "Dining Area",
  "Information Center",
];

const DetailDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    city: "",
    operational_hours: "",
    address: "",
    description: "",
    ticket_price: "",
    link_images: ["", "", ""],
    facilities: [],
    images: [],
  });

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch destination data
        const destinationResponse = await axiosInstance.get(
          `/destination/${id}`
        );
        const destinationData = destinationResponse.data.destination;

        // Fetch cities
        const cityResponse = await axiosInstance.get("/city");
        setCities(cityResponse.data.cities || []);

        // Set form data
        setFormData({
          name: destinationData.name || "",
          category: destinationData.category || "",
          city: destinationData.city?.name || "",
          operational_hours: destinationData.operational_hours || "",
          address: destinationData.address || "",
          description: destinationData.description || "",
          ticket_price: destinationData.ticket_price || "",
          link_images: destinationData.images
            ?.map((img) => img.url)
            .slice(0, 3) || ["", "", ""],
          facilities: destinationData.facilities || [],
          images: destinationData.images || [],
        });

        // Set original data
        setData(destinationData);
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data destinasi");
      }
    };

    fetchInitialData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageLinkChange = (index, value) => {
    const newLinkImages = [...formData.link_images];
    newLinkImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      link_images: newLinkImages,
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => {
      const currentFacilities = prev.facilities;
      const newFacilities = currentFacilities.includes(facility)
        ? currentFacilities.filter((f) => f !== facility)
        : [...currentFacilities, facility];

      return {
        ...prev,
        facilities: newFacilities,
      };
    });
  };

  const handleSave = async () => {
    const requiredFields = [
      "name",
      "category",
      "city",
      "address",
      "description",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Harap isi field: ${missingFields.join(", ")}`);
      return;
    }

    const validImageLinks = formData.link_images.filter(
      (link) => link.trim() !== ""
    );

    const payload = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      category: formData.category,
      description: formData.description,
      ticket_price: Number(formData.ticket_price),
      facilities: formData.facilities.join(", "),
      operational_hours: formData.operational_hours,
      image: validImageLinks,
    };

    try {
      console.log("Payload untuk update:", payload);
      const response = await axiosInstance.put(`/destination/${id}`, payload);

      setData(response.data.destination);
      setFormData((prev) => ({
        ...prev,
        images: response.data.destination?.image || [],
      }));

      setIsEditing(false);
      alert("Berhasil menyimpan perubahan");
    } catch (error) {
      console.error("Error saving destination:", error);
      alert(error.response?.data?.message || "Gagal menyimpan perubahan");
    } finally {
      window.location.reload();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <PlainCard
        className="py-2 mb-4"
        title="Detail Destination"
        description={isEditing ? "Edit Destination" : "View Destination"}
      />

      <div className="flex justify-end mb-4">
        {isEditing ? (
          <div className="flex flex-row gap-4">
            <Button color="failure" onClick={handleEditToggle}>
              <FaTimes className="mr-2" /> Cancel
            </Button>
            <Button color="success" onClick={handleSave}>
              <FaSave className="mr-2" /> Save
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditToggle}>
            <FaEdit className="mr-2" /> Edit
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5 my-5 bg-white rounded-3xl shadow-lg p-6">
        <div className="flex flex-col gap-6 w-1/2">
          {isEditing ? (
            <>
              {formData.link_images.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) =>
                      handleImageLinkChange(index, e.target.value)
                    }
                    placeholder="Enter image URL"
                    className="flex-grow border rounded p-2"
                  />
                </div>
              ))}
            </>
          ) : (
            data.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Destination image ${index + 1}`}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-image.png";
                }}
              />
            ))
          )}
        </div>

        <div className="w-full space-y-6">
          <div className="w-full flex md:flex-row flex-col gap-6">
            <LabelInput
              label="Destination Name"
              name="name"
              type="text"
              value={isEditing ? formData.name : data.name}
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
            />
            <LabelInput
              label="Category"
              name="category"
              type="text"
              value={isEditing ? formData.category : data.category}
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
            />
          </div>

          <div className="w-full flex md:flex-row flex-col gap-6">
            <SelectInput
              label="Destination City"
              name="city"
              placeholder={data.city?.name}
              options={cities.map((city) => city.name)}
              onChange={handleInputChange}
              value={isEditing ? formData.city : data.city}
            />
            <LabelInput
              label="Operating Hours"
              name="operational_hours"
              type="text"
              value={
                isEditing ? formData.operational_hours : data.operational_hours
              }
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
              placeholder="e.g., 08:00 - 17:00"
            />
          </div>

          <div className="w-full flex md:flex-row flex-col gap-6">
            <LabelInput
              label="Destination Address"
              name="address"
              type="description"
              value={isEditing ? formData.address : data.address}
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
            />
            <LabelInput
              label="Destination Description"
              name="description"
              type="description"
              value={isEditing ? formData.description : data.description}
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
            <LabelInput
              label="Entrance Ticket Price"
              name="ticket_price"
              type="text"
              value={isEditing ? formData.ticket_price : data.ticket_price}
              onChange={isEditing ? handleInputChange : undefined}
              placeholder="Price in local currency"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Facility</h2>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
                {availableFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`facility-${index}`}
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityChange(facility)}
                    />
                    <Label htmlFor={`facility-${index}`} className="text-base">
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="text-white py-2 px-4 rounded-lg bg-[#0EA5E9]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default DetailDestination;
