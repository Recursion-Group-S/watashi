import { atom, useAtom } from "jotai"
import { useEffect } from "react";
import { auth } from "../client/firebase";
import { onAuthStateChanged } from "firebase/auth"

const authUserState = atom(null);
export const useAuth = () => {
  const [userAuth, setUserAuth] = useAtom(authUserState)

  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      setUserAuth(user);
    } else {
      setUserAuth(null);
    }
    return () => unsubscribe();
  })

  return { userAuth,setUserAuth }
}