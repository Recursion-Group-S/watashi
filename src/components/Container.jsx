import { onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authUserAtom } from "../atoms/authUser";
import { auth } from "../client/firebase";
import "../index.css";

import Header from "./Header";

const Container = ({ children }) => {
  const navigate = useNavigate();
  const setUserAuth = useSetAtom(authUserAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen" style={{ backgroundColor: "#f6e8aa" }}>
      <Header />
      <div
        className="grid p-0 place-items-center"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div style={{ Width: 1110, Height: 696 }}>{children}</div>
      </div>
    </div>
  );
};

export default Container;
