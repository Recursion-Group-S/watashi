import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useAuth } from "../../hooks/useAuth";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";

const CreateMap = () => {
  const navigate = useNavigate();
  const { userAuth } = useAuth();
  useEffect(() => {
    if (!userAuth) navigate("/");
  });
  return (
    <div className="flex gap-x-4">
      <CanvasArea />
      <Sidebar />
    </div>
  );
};

export default CreateMap;
