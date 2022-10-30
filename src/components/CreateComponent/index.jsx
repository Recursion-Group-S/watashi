import React, { useEffect } from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import { useAtom } from "jotai";
import { canvasRefAtom } from "../../atoms/ComponentAtom";

const CreateComponent = () => {
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const [, setCanvasAtom] = useAtom(canvasRefAtom);

  useEffect(() => {
    setCanvasAtom(canvasRef);
    // currentMapをfetch
  }, [])

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea ref={canvasRef} />
      <Sidebar />
    </div>
  );
};

export default CreateComponent;