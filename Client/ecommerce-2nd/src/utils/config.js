import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = ({
    apiKey: "AIzaSyDwJKljraA28rKzv5FaBciX6gwkrisSQxU",
    authDomain: "imageuploaddb-7c647.firebaseapp.com",
    projectId: "imageuploaddb-7c647",
    storageBucket: "imageuploaddb-7c647.appspot.com",
    messagingSenderId: "567919397792",
    appId: "1:567919397792:web:a1d930065060a44516b2c5",
    measurementId: "G-E2DW46B55V"
});

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);