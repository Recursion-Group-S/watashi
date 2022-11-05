import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import "../index.css";

import Header from "./Header";

const Container = ({ children }) => {
  const navigate = useNavigate();
  const userAuth = useAuthUser();

  useEffect(() => {
    if (!userAuth) navigate("/");
  },[]);

  return (
    <div
      className="h-screen"
      style={{ backgroundColor: "#f6e8aa", height: "100%" }}
    >
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
