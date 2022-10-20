import React, { useEffect } from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import uuid from "react-uuid/uuid";
import { useNewItem } from "../../hooks/useNewItem";
import { useAtom } from "jotai";
import { canvasRefAtom } from "../../atoms/ComponentAtom";

const CreateComponent = () => {
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const [, setCanvasAtom] = useAtom(canvasRefAtom);

  

  useEffect(() => {
    setCanvasAtom(canvasRef);
  }, [])

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea ref={canvasRef} />
      <Sidebar />
    </div>
  );
};

export default CreateComponent;
