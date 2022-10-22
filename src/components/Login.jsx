import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../client/firebase";
import { useNavigate } from "react-router-dom/dist";
import { authUserAtom } from "../atoms/authUser";
import { useSetAtom } from "jotai";
import { postUser } from "../db/user";

const Login = () => {
  // const { setUserAuth } = useAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const setUserAuth = useSetAtom(authUserAtom);
  const clickLogin = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      setUserAuth(result.user);
      postUser(
        result.user.uid,
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );
      navigate("/createMap");
    });
  };

  return (
    <div>
      <div className="text-6xl text-center mb-8">LOGO</div>
      <button
        onClick={clickLogin}
        className="inline-block rounded border border-sky-600 bg-sky-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-500"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default Login;
