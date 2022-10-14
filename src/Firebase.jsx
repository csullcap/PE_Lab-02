import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9DoIAiDV7WuJjCul05gEKVeskJ7gC1JY",
  authDomain: "horario-unsa.firebaseapp.com",
  projectId: "horario-unsa",
  storageBucket: "horario-unsa.appspot.com",
  messagingSenderId: "201911120410",
  appId: "1:201911120410:web:3dc9bb4e21530a05dc97a3",
  measurementId: "G-9QN9WPQVMZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })

    .catch((error) => {
      console.log(error);
    });
}; */
