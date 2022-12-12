
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "@vue/reactivity";

export function useAuthentication(){
  const isLoggedIn = ref(false);

  if(import.meta.env.VITE_IS_TEST_ENV != "true"){
    onAuthStateChanged(getAuth(), (user) => {
      isLoggedIn.value = user ? true : false;
    })
  } else {
    isLoggedIn.value = true;
  }

  return { isLoggedIn }
}