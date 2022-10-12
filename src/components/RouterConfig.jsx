import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const RouterConfig = () => {
  const CreateMap = lazy(() => import("./CreateMap"));
  const Login = lazy(() => import("./Login"));
  const Gallery = lazy(() => import("./Gallery"));
  const CreateComponent = lazy(() => import("./CreateComponent"));
  const Loading = () => {
    return <p>Loading...</p>;
  };
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={Loading}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/createMap" element={<CreateMap />} />
            <Route path="/createComponent" element={<CreateComponent />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
