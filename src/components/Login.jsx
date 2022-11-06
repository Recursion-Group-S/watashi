import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../client/firebase";
import { useNavigate } from "react-router-dom/dist";
import { postUser } from "../db/user";

const Login = () => {
  // const { setUserAuth } = useAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const clickLogin = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      postUser(
        result.user.uid,
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );
      navigate("/gallery");
    });
  };

  return (
    <div>
      <div className="mb-12">
        <img className="w-96" src="/images/watashi_logo.png" alt="watashi_logo" />
      </div>
      <button
        onClick={clickLogin}
        className="m-auto block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-500"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default Login;
