import React from "react";
import "../index.css";

import Header from "./Header";

const Container = ({ children }) => {
  return (
    <div className="bg-slate-100 h-screen">
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
