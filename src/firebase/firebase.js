
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { addDoc, collection, getDocs, setDoc, doc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default  {
  getAllClubFines: async () => {
    let fines = []
    const querySnapshot = await getDocs(collection(database, "clubfines"));
    querySnapshot.forEach((doc) => {
      fines.push(doc.data());
    })
    return fines;
  },
  clubFineExists: async (reason) => {
    let fines = []
    const querySnapshot = await getDocs(collection(database, "clubfines"));
    querySnapshot.forEach((doc) => {
      fines.push(doc.data());
    })
    let filteredFines = fines.filter((fine) => fine.reason.toLowerCase() == reason.toLowerCase());
    return filteredFines.length > 0;
  },
  addClubFine: async (reason, amount) => {
    await addDoc(collection(database, "clubfines"), {
      reason: reason,
      amount: amount,
    });
  },
  getAllPlayers: async () => {
    let players = []
    const querySnapshot = await getDocs(collection(database, "players"));
    querySnapshot.forEach((doc) => {
      players.push(doc.data());
    })
    return players;
  },
  getAllPlayersNameAndIds: async () => {
    let players = []
    const querySnapshot = await getDocs(collection(database, "players"));
    querySnapshot.forEach((doc) => {
      let player = doc.data();
      player.id = doc.id
      players.push(player);
    })
    return players;
  },
  addPlayer: async (firstName, lastName, shirtNumber) => {
    await addDoc(collection(database, "players"), {
      firstName: firstName,
      lastName: lastName,
      shirtNumber: shirtNumber,
    });
  },
  playerExists: async (shirtNumber) => {
    let players = []
    const querySnapshot = await getDocs(collection(database, "players"));
    querySnapshot.forEach((doc) => {
      players.push(doc.data());
    })
    let filteredPlayers = players.filter((player) => player.shirtNumber == shirtNumber);
    return filteredPlayers.length > 0;
  },

  getAllFines: async () => {
    let fines = []
    const querySnapshot = await getDocs(collection(database, "fines"));
    querySnapshot.forEach((doc) => {
      let fine = doc.data();
      fine.id = doc.id;
      fines.push(fine);
    })
    return fines;
  },
  addPlayerFines: async (playerFines) => {
    playerFines.forEach( async (fine) => {
      await addDoc(collection(database, "fines"), fine);
    })
  },
  saveFine: async (fine) => {
    const fineRef = doc(database, "fines", `${fine.id}`);
    await setDoc(fineRef, fine, {merge: true});
  },
  voidFine: async (id) => {
    const fineRef = doc(database, "fines", id);
    await setDoc(fineRef, {void: true}, {merge: true});
  },
}
