import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import PlainCard from "../../components/Admin/PlainCard";
import SelectInput from "../../components/Admin/SelectInput";
import LabelInput from "../../components/Admin/LabelInput";
import Dropzone from "../../components/Admin/Dropzone";
import { Button } from "flowbite-react";

const AddContentPage = () => {
  const [formData, setFormData] = useState({
    destination_city: "",
    destinationId: "",
    images: [],
    video_contents: [
      {
        title: "",
        url: "",
        description: "",
      },
    ],
  });

  const [cities, setCities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [imageLinks, setImageLinks] = useState(["", "", ""]);

  const handleImageLinkChange = (index, value) => {
    const newImageLinks = [...imageLinks];
    newImageLinks[index] = value;
    setImageLinks(newImageLinks);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cityResponse = await axiosInstance.get("/city");
        setCities(cityResponse.data.cities || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchInitialData();
  }, []);

  const fetchDestinationsByCity = async (cityName) => {
    if (!cityName) {
      setDestinations([]);
      return;
    }

    try {
      const response = await axiosInstance.get("/destination", {
        params: { city: cityName },
      });

      const fetchedDestinations = response.data.destinations || [];
      setDestinations(fetchedDestinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "destination_city") {
      fetchDestinationsByCity(value);

      setFormData((prev) => ({
        ...prev,
        destinationId: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.destinationId) {
      alert("Pilih destinasi terlebih dahulu");
      return;
    }

    const filteredImageLinks = imageLinks.filter((link) => link.trim() !== "");

    const payload = {
      destinationID: parseInt(formData.destinationId),
      image: filteredImageLinks,
      video_contents: formData.video_contents.map((content) => ({
        title: content.title,
        url: content.url,
        description: content.description,
      })),
    };

    try {
      console.log("Payload:", payload);

      const response = await axiosInstance.post("/destination/assets", payload);

      console.log("Content added:", response.data);
      navigate("/admin/content");
    } catch (error) {
      console.error(
        "Error adding content:",
        error.response?.data || error.message
      );

      if (error.response) {
        alert(error.response.data.message || "Gagal menambahkan konten");
      } else {
        alert("Terjadi kesalahan dalam mengirim data");
      }
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <PlainCard
        className="py-2"
        title="Add Content"
        description="Add Content Details"
      />
      <div className="flex md:flex-row flex-col my-5 gap-5 bg-white rounded-3xl shadow-lg p-6 w-full">
        <div className="w-2/5 px-5">
          <Dropzone
            className="h-96"
            onFileUpload={(files) => {
              setFormData((prev) => ({
                ...prev,
                images: files,
              }));
            }}
            multiple
          />
        </div>
        <div className="space-y-6 w-full px-4">
          <SelectInput
            label="Destination City"
            id="destination_city"
            name="destination_city"
            placeholder="Select Destination City"
            options={cities.map((city) => city.name)}
            onChange={handleInputChange}
            value={formData.destination_city}
          />
          <SelectInput
            label="Destination"
            id="destinationId"
            name="destinationId"
            placeholder="Select Destination"
            options={destinations?.map((dest) => ({
              value: dest.id,
              label: dest.name,
            }))}
            onChange={handleInputChange}
            value={formData.destinationId}
            disabled={!formData.destination_city}
          />
          <LabelInput
            label="Video Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
          <LabelInput
            label="Video Description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
          <LabelInput
            label="Link Content (Video URL)"
            name="link_content"
            type="text"
            value={formData.link_content}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
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

export default AddContentPage;
