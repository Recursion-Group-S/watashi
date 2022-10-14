import { atom, useAtom } from "jotai"
import { useEffect } from "react";
import { auth } from "../client/firebase";
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom/dist";

const authUserState = atom(null);
export const useAuth = () => {
  const [userAuth, setUserAuth] = useAtom(authUserState);
  const navigate = useNavigate();

  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      setUserAuth(user);
    } else {
      setUserAuth(null);
      navigate("/");
    }
    return () => unsubscribe();
  })

  return { userAuth,setUserAuth }
}