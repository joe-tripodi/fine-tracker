
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { addDoc, collection, getDocs } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJgWeRp82eZmVTK6UzTb4COjvn1QBhSJw",
  authDomain: "fines-wssc.firebaseapp.com",
  projectId: "fines-wssc",
  storageBucket: "fines-wssc.appspot.com",
  messagingSenderId: "631644080600",
  appId: "1:631644080600:web:1726c144d6e42ca94d8aad",
  measurementId: "G-S348YFRZ29"
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
      fines.push(doc.data());
    })
    return fines;
  }
}
