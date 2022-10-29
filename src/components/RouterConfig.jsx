import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Container";

export const RouterConfig = () => {
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
          <Container>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/createComponent" element={<CreateComponent />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Container>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
