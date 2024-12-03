// import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";

// // Fungsi untuk memulai chat dengan Gemini AI
// export const getGeminiResponse = async (apiKey, prompt, chatHistory) => {
//   try {
//     // Inisialisasi Google Generative AI dengan API Key
//     const genAI = new GoogleGenerativeAI(apiKey);

//     // Konfigurasi model generatif
//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro",
//       safetySettings: [
//         { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT },
//       ],
//       generationConfig: {
//         maxOutputTokens: 200,
//         temperature: 0.8,
//       },
//     });

//     // Mulai sesi chat menggunakan riwayat chat yang ada
//     const chat = model.startChat({ history: chatHistory });
//     const result = await chat.sendMessageStream(prompt);

//     // Gabungkan hasil stream menjadi teks utuh
//     let aiResponse = "";
//     for await (const chunk of result.stream) {
//       aiResponse += chunk.text();
//     }

//     return aiResponse; // Kembalikan respon AI
//   } catch (error) {
//     console.error("Error in Gemini API call:", error);
//     throw new Error("Failed to fetch response from Gemini AI.");
//   }
// };
