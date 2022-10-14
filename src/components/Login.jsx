import React, { useEffect } from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../client/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom/dist";

const Login = () => {
  const { setUserAuth } = useAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const clickLogin = async () => {
    await signInWithPopup(auth, provider);
    await getRedirectResult(auth)
      .then((result) => {
        console.log(result.user);
        setUserAuth(result.user);
      })
      .catch((err) => {
        console.error(err.code);
        console.error(err.message);
      });
    navigate("/createMap");
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
