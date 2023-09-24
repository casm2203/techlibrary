import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4chtI4ltbUdg4mO7FidJ0Ev6vkjMd7pg",
  authDomain: "techlibrary-22.firebaseapp.com",
  projectId: "techlibrary-22",
  storageBucket: "techlibrary-22.appspot.com",
  messagingSenderId: "557502435809",
  appId: "1:557502435809:web:0e217038106e34207f02a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, nameFile) {
  try {
    const storageRef = ref(storage, nameFile);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded file!");
    });
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null; // O maneja el error de otra manera
  }
}
