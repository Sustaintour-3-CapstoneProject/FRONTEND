import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance"; // Gunakan instance axios Anda
import { FaTrash } from "react-icons/fa"; // Ikon hapus

const VideoTable = () => {
  const [videos, setVideos] = useState([]); // State untuk menyimpan daftar video
  const [selectedVideo, setSelectedVideo] = useState(null); // State untuk menyimpan video yang dipilih

  useEffect(() => {
    // Fetch data dari API menggunakan axiosInstance
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get("/destination"); // Endpoint API
        const data = response.data;

        // Validasi `video_contents` agar tidak null sebelum `flatMap`
        const videos = data.destinations.flatMap((destination) =>
          destination.video_contents
            ? destination.video_contents.map((video) => ({
                destinationName: destination.name, // Nama destinasi
                videoTitle: video.title, // Judul video
                videoUrl: video.url, // URL video
                videoDescription: video.description, // Deskripsi video
              }))
            : []
        );

        setVideos(videos); // Menyimpan video ke dalam state videos
      } catch (error) {
        console.error("Error fetching data:", error); // Menangani error
      }
    };

    fetchVideos(); // Memanggil fungsi fetchVideos saat komponen dimuat
  }, []); // Hanya dijalankan sekali setelah komponen dimuat

  const handleRowClick = (video) => {
    setSelectedVideo(video); // Menampilkan detail video ketika baris diklik
  };

  const handleDelete = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos); // Menghapus video berdasarkan index
  };

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-xl font-bold mb-4">Video Content Table</h1>

      {/* Menampilkan Total Konten */}
      <div className="mb-4">
        <span className="font-semibold text-lg">Total Content: </span>
        <span>{videos.length}</span>
      </div>

      {/* Tabel untuk menampilkan daftar video */}
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">
              Destination Name
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Destination Description
            </th>
            <th className="border border-gray-300 px-4 py-2">Content Link</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(video)} // Menangani klik baris
            >
              <td className="border border-gray-300 px-4 py-2">
                {video.destinationName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {video.videoDescription}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {video.videoUrl}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Menghindari trigger onClick baris
                    handleDelete(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menampilkan Detail Video jika ada video yang dipilih */}
      {selectedVideo && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-lg">
          <h2 className="text-xl font-bold">Detail Video</h2>
          <p>
            <strong>Deskripsi:</strong> {selectedVideo.videoDescription}
          </p>
          <p>
            <strong>URL Video:</strong>
            <a
              href={selectedVideo.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {selectedVideo.videoUrl}
            </a>
          </p>
          <div className="mt-4">
            <video width="100%" controls>
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTable;
