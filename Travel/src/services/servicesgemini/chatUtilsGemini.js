import { getGeminiResponse } from "./geminiApi";
// import { getEnergyData } from "../ServiceApi/energyApi";

// Fungsi untuk mengelola pengiriman prompt dan respons AI
export const handleChatSubmit = async ({
  event,
  prompt,
  setLoading,
  setError,
  setChatHistory,
  chatHistory,
  setPrompt,
}) => {
  event.preventDefault(); // Mencegah refresh halaman
  if (!prompt.trim()) return; // Jika input kosong, keluar dari fungsi

  setLoading(true); // Mengaktifkan indikator loading
  setError(""); // Menghapus error sebelumnya
  setChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "user", parts: [{ text: prompt }] }, // Tambahkan prompt pengguna ke riwayat
  ]);

  try {
    // // Ambil data energi untuk dijadikan referensi dalam jawaban AI
    // const EnergyData = await getEnergyData();
    // const EnergyDataInfo = EnergyData.data
    //   .map(
    //     (energy) =>
    //       `Nama Device: ${energy.device}, Daya Watt: ${energy.watt}, Tanggal Pemakaian: ${energy.date}, Durasi Pemakaian: ${energy.usageHours}`
    //   )
    //   .join("\n");
    const energySpecificPrompt = prompt;
    //   Kamu adalah asisten virtual yang cerdas yang siap membantu pengguna dengan pertanyaan mereka tentang perangkat dan konsumsi energi.
    //   Data perangkat pengguna yang ada adalah sebagai berikut:

    //   ${EnergyDataInfo}

    //   Pengguna akan bertanya mengenai perangkat dan penggunaannya. Cobalah memberikan jawaban yang relevan dan interaktif berdasarkan pertanyaan mereka. Pastikan setiap jawaban mengarah pada percakapan lebih lanjut jika perlu.

    //   Pertanyaan Pengguna: "${prompt}"
    // `;

    // Panggil API Gemini melalui fungsi utilitas
    const aiResponse = await getGeminiResponse(
      `AIzaSyDKLWJINRlnTR4yLC89h7 - NpYBsBHFezf4`, // API Key
      energySpecificPrompt, // Prompt yang dihasilkan
      chatHistory // Riwayat obrolan
    );

    // Tambahkan respons AI ke riwayat obrolan
    if (aiResponse) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "model", parts: [{ text: aiResponse }] },
      ]);
    }

    setPrompt(""); // Kosongkan input pengguna
  } catch (err) {
    console.error(err);
    setError("An error occurred while generating content."); // Tampilkan error jika ada
  } finally {
    setLoading(false); // Nonaktifkan indikator loading
  }
};
