import { getGeminiResponse } from "./geminiApi";
import {
  fetchDestinations,
  fetchNearbyDestinations,
} from "../../utils/apiUtils";

export const handleChatSubmit = async ({
  event,
  prompt,
  setLoading,
  setError,
  setChatHistory,
  chatHistory,
  setPrompt,
  auth,
}) => {
  event.preventDefault();
  if (!prompt.trim()) return;

  setLoading(true);
  setError("");
  setChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "user", parts: [{ text: prompt }] },
  ]);

  try {
    const userCityId = auth.city;
    // const userCategory = auth.category || "";
    const username = auth.first_name;
    console.log("City ID:", userCityId, "username", username);
    // Fetch destinasi relevan berdasarkan cityId
    const relevantDestinations = userCityId
      ? await fetchNearbyDestinations(userCityId)
      : []; // Jika cityId tidak ada, hasilkan array kosong
    console.log("Relevant Destinations:", relevantDestinations);
    // Filter destinasi berdasarkan kategori pengguna
    // const categoryDestinations = userCategory
    //   ? relevantDestinations.filter(
    //       (destination) =>
    //         destination.category?.toLowerCase() === userCategory.toLowerCase()
    //     )
    //   : [];

    // Ambil semua destinasi untuk data di luar kota atau kategori
    const allDestinations = await fetchDestinations();
    const otherDestinations = allDestinations.filter(
      (destination) => destination.city?.id !== userCityId
    );

    // Gabungkan hasil rekomendasi
    const recommendations = [
      ...relevantDestinations, // Berdasarkan kategori preferensi
      ...otherDestinations, // Di luar kota dan kategori
    ];
    console.log("Recommendations:", recommendations);
    // Format data untuk prompt
    const recommendationsInfo = recommendations
      .map((destination) => {
        const facilities = destination.facilities || "Tidak tersedia";
        const city = destination.city?.name || "Tidak diketahui";
        const address = destination.address || "Alamat tidak tersedia";
        const ticketPrice = destination.ticket_price
          ? `Rp ${destination.ticket_price}`
          : "Gratis";
        const operationalHours =
          destination.operational_hours || "Jam operasional tidak tersedia";
        const description =
          destination.description || "Deskripsi tidak tersedia";

        return `Nama Destinasi: ${destination.name}
Lokasi: ${city}, ${address}
Fasilitas: ${facilities}
Harga Tiket: ${ticketPrice}
Jam Operasional: ${operationalHours}
Deskripsi: ${description}\n`;
      })
      .join("\n");

    console.log("Recommendations Info:", recommendationsInfo);

    const destinationSpecificPrompt = `
  Kamu adalah asisten virtual yang ramah dan cerdas yang siap membantu pengguna merencanakan perjalanan atau menemukan destinasi wisata.

  Nama Pengguna: ${username}

  ${
    relevantDestinations.length > 0
      ? `Berikut adalah destinasi yang relevan dengan preferensi pengguna berdasarkan lokasi atau kategori:
        ${recommendationsInfo}`
      : "Tidak ada destinasi relevan yang ditemukan."
  }

  Jika destinasi relevan tidak ditemukan atau pengguna ingin lebih banyak opsi, berikut adalah beberapa destinasi lain yang bisa dipertimbangkan:
  ${
    otherDestinations.length > 0
      ? `Destinasi lain yang juga bisa dipertimbangkan:
        ${recommendationsInfo}`
      : "Tidak ada destinasi lain yang dapat direkomendasikan."
  }

  Pertanyaan Pengguna: "${prompt}"

  Harap prioritaskan rekomendasi berdasarkan destinasi relevan yang disebutkan di atas. Jika tidak ada yang sesuai, saran lain yang relevan bisa diberikan.
`;

    // Kirim prompt ke AI
    const aiResponse = await getGeminiResponse(
      import.meta.env.VITE_API_KEY,
      destinationSpecificPrompt,
      chatHistory
    );

    // Tambahkan respons AI ke riwayat obrolan
    if (aiResponse) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "model", parts: [{ text: aiResponse }] },
      ]);
    }

    setPrompt("");
  } catch (err) {
    console.error("Error:", err);
    setError("Terjadi kesalahan saat menghasilkan konten.");
  } finally {
    setLoading(false);
  }
};
