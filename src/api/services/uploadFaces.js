import axios from "axios";

const API_URL = "https://36b6-14-187-91-80.ngrok-free.app/upload-faces/";

export const uploadFace = async (name, files) => {
  if (!files || files.length !== 5) {
    throw new Error("Exactly 5 files are required");
  }

  const formData = new FormData();
  
  // Append each file individually
  files.forEach((file, index) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post(
      `${API_URL}?name=${encodeURIComponent(name)}`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error);
    throw error;
  }
};
