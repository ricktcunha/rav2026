// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
// TODO: Replace with your actual config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

export const uploadImage = async (imageDataUrl: string): Promise<string> => {
  // MOCK IMPLEMENTATION FOR PROTOTYPE
  // In a real scenario, uncomment the code below and configure Firebase

  // Prevent unused variable warning for app
  console.log("Firebase app initialized:", app.name);

  console.log("Mock Uploading image...", imageDataUrl.slice(0, 50) + "...");

  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a dummy URL or the image data itself for testing
      resolve("https://example.com/share/image-id-123");
    }, 2000);
  });

  /* REAL IMPLEMENTATION
  try {
    const storageRef = ref(storage, `captures/${Date.now()}.jpg`);
    await uploadString(storageRef, imageDataUrl, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
  */
};
