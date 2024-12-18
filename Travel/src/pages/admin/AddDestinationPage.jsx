import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Label, Button } from "flowbite-react";
import axiosInstance from "../../api/axiosInstance";
import PlainCard from "../../components/Admin/PlainCard";
import Dropzone from "../../components/Admin/Dropzone";
import LabelInput from "../../components/Admin/LabelInput";
import SelectInput from "../../components/Admin/SelectInput";

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    position: null,
    address: "",
    operational_hours: "",
    ticket_price: "",
    category: "",
    description: "",
    facilities: [],
    image: [],
    video_contents: [],
    link_images: ["", "", ""],
  });

  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axiosInstance.get("/city");
        setCity(response.data.cities || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCity();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleImageUpload = (file, index) => {
    const newImages = [...formData.image];
    newImages[index] = file;
    setFormData((prev) => ({
      ...prev,
      image: newImages,
    }));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.image];
    newImages[index] = null;
    setFormData((prev) => ({
      ...prev,
      image: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "address", "category", "description"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Harap isi field wajib: ${missingFields.join(", ")}`);
      return;
    }

    const combinedImages = [
      ...formData.image.filter((img) => img),
      ...formData.link_images.filter((link) => link.trim() !== ""),
    ];

    const payload = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      category: formData.category,
      description: formData.description,
      ticket_price: Number(formData.ticket_price) || 0,
      facilities: formData.facilities.join(", "),
      operational_hours: formData.operational_hours || "",
      image: combinedImages,
    };

    try {
      console.log(payload);
      const response = await axiosInstance.post("/destination", payload);
      navigate("/dashboard/destination");
    } catch (error) {
      console.error("Submission error", error.response?.data);
      alert(error.response?.data?.message || "Gagal menambahkan destinasi");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const availableFacilities = [
    "Toilets",
    "Parking Area",
    "Dining Area",
    "Information Center",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <PlainCard
        className="py-2"
        title="Add Destination"
        description="Add Destination Details"
      />
      <div className="flex flex-col md:flex-row gap-5 my-5 bg-white rounded-3xl shadow-lg p-6">
        <div className="flex flex-col gap-6 w-1/2">
          <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
            {formData.link_images.map((link, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden relative group"
              >
                {link ? (
                  <>
                    <img
                      src={link}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => window.open(link, "_blank")}
                        className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    Image Preview
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full flex md:flex-row flex-col gap-6">
            <LabelInput
              label="Destination Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
            <LabelInput
              label="Category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex md:flex-row flex-col gap-6">
            <SelectInput
              label="Destination City"
              id="city"
              name="city"
              placeholder="Select Destination City"
              options={city.map((city) => city.name)}
              onChange={handleInputChange}
              value={formData.city}
            />
            <LabelInput
              label="Operating Hours"
              name="operational_hours"
              type="text"
              value={formData.operational_hours}
              onChange={handleInputChange}
              placeholder="e.g., 08:00 - 17:00"
            />
          </div>
          <div className="w-full flex md:flex-row flex-col gap-6">
            <LabelInput
              label="Destination Address"
              name="address"
              type="description"
              value={formData.address}
              onChange={handleInputChange}
            />
            <LabelInput
              label="Destination Description"
              name="description"
              type="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
            <LabelInput
              label="Entrance Ticket Price"
              name="ticket_price"
              type="text"
              value={formData.ticket_price}
              onChange={handleInputChange}
              placeholder="Price in local currency"
            />
            {[0, 1, 2].map((index) => (
              <LabelInput
                key={index}
                label={`Link Image ${index + 1}`}
                name={`link_images[${index}]`}
                type="text"
                value={formData.link_images[index]}
                onChange={(e) => {
                  const newLinkImages = [...formData.link_images];
                  newLinkImages[index] = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    link_images: newLinkImages,
                  }));
                }}
              />
            ))}
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
      <div className="flex justify-end space-x-4">
        <Button color="gray" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" color="customBlue">
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddDestinationPage;
