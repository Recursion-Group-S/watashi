import React from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import uuid from "react-uuid/uuid";
import { useNewItem } from "../../hooks/useNewItem";
import { useAtom } from "jotai";
import { canvasIconsAtom } from "../../atoms/Atoms";

const CreateComponent = () => {
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const { isValidDrop, createAddItem } = useNewItem();
  const [canvasIcons, setCanvasIcons] = useAtom(canvasIconsAtom);

  const addNewItem = (e, item) => {
    if (!isValidDrop(e, canvasRef)) {
      return;
    }
    createAddItem(item, canvasRef, canvasIcons, setCanvasIcons);
    // let newComponent = {
    //   x: item.x - canvasRef.current.getBoundingClientRect().left,
    //   y: item.y - canvasRef.current.getBoundingClientRect().top,
    //   width: 100,
    //   height: 100,
    //   rotation: 0,
    //   url: item.url,
    //   id: uuid(),
    // };
    // setImageComponents([...imageComponents, newComponent]);
  };

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea ref={canvasRef} />
      <Sidebar />
    </div>
  );
};

export default CreateComponent;
