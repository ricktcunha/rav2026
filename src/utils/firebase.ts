// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { initFirestore } from "./firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkvPY4APHBEOWkN2_5CZYggkQ3q8U2hgo",
  authDomain: "adubosreal-rav2026.firebaseapp.com",
  projectId: "adubosreal-rav2026",
  storageBucket: "adubosreal-rav2026.firebasestorage.app",
  messagingSenderId: "503269152554",
  appId: "1:503269152554:web:7aea6a5d673c1060ed7053",
  measurementId: "G-XWD1R0LFEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Firestore
initFirestore(app);

export const uploadImage = async (imageDataUrl: string): Promise<string> => {
  try {
    console.log("Starting image upload...");
    const timestamp = Date.now();
    const filename = `captures/${timestamp}.jpg`;
    const storageRef = ref(storage, filename);
    
    console.log("Uploading to:", filename);
    console.log("Image data URL length:", imageDataUrl.length);
    
    // Upload the image
    await uploadString(storageRef, imageDataUrl, 'data_url');
    console.log("Upload successful, getting download URL...");
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL obtained:", downloadURL);
    
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    console.error("Error code:", error?.code);
    console.error("Error message:", error?.message);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Re-throw with more context
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.code || 'unknown';
    throw new Error(`Upload failed (${errorCode}): ${errorMessage}`);
  }
};
