import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
export default storage;