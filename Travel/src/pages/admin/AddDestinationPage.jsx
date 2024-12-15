import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Label, Button, Select } from "flowbite-react";
import PlainCard from "../../components/Admin/PlainCard";
import LabelInput from "../../components/Admin/LabelInput";
import axiosInstance from "../../api/axiosInstance";

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "Jakarta",
    position: null,
    address: "",
    operational_hours: "",
    ticket_price: "",
    category: "Nature",
    description: "",
    facilities: [],
    imageUrls: ["", "", ""],
  });

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

  const handleImageUrlChange = (index, url) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = url;
    setFormData((prev) => ({
      ...prev,
      imageUrls: newImageUrls,
    }));
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = "";
    setFormData((prev) => ({
      ...prev,
      imageUrls: newImageUrls,
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

    const payload = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      category: formData.category,
      description: formData.description,
      ticket_price: Number(formData.ticket_price) || 0,
      facilities: formData.facilities.join(", "),
      operational_hours: formData.operational_hours || "",
      image: formData.imageUrls.filter((url) => url),
    };

    try {
      console.log(payload);
      const response = await axiosInstance.post("/destination", payload);
      navigate("/admin/destination");
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
    "Food Stalls",
    "Souvenir Shops",
  ];
  const availableCities = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"];
  const availableCategories = ["Nature", "Culture", "Ecotourism"];
  const placeholderImage =
    "https://via.placeholder.com/300x200?text=Image+Preview";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100">
      <PlainCard
        title="Add Destination"
        description="Add Destination Details"
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6 bg-white shadow-lg rounded-3xl p-6">
        {/* Image Previews */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-2">
              <LabelInput
                label={`Image URL ${index + 1}`}
                name={`image-url-${index}`}
                type="text"
                value={formData.imageUrls[index]}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="Paste image URL here"
              />
              <div className="relative">
                <img
                  src={formData.imageUrls[index] || placeholderImage}
                  alt={`Preview ${index + 1}`}
                  className="h-48 w-full object-cover rounded-lg border"
                />
                {formData.imageUrls[index] && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-6">
          <LabelInput
            label="Destination Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="flex flex-row gap-6">
            <div className="w-full">
              <Label htmlFor="city">City</Label>
              <Select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                {availableCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {availableCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <LabelInput
            label="Operating Hours"
            name="operational_hours"
            type="text"
            value={formData.operational_hours}
            onChange={handleInputChange}
            placeholder="e.g., 08:00 - 17:00"
          />
          <LabelInput
            label="Ticket Price"
            name="ticket_price"
            type="text"
            value={formData.ticket_price}
            onChange={handleInputChange}
          />
          <LabelInput
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
          />
          <LabelInput
            label="Description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div>
            <h2 className="text-lg font-semibold mb-2">Facilities</h2>
            <div className="grid grid-cols-2 gap-2">
              {availableFacilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    id={`facility-${index}`}
                    checked={formData.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                  />
                  <Label htmlFor={`facility-${index}`}>{facility}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <Button color="gray" onClick={handleBack}>
          Kembali
        </Button>
        <Button type="submit" color="blue">
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default AddDestinationPage;
