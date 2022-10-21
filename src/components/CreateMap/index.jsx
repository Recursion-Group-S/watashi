import React, { forwardRef, useRef } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import { useNewItem } from "../../hooks/useNewItem";
import { useAtom } from "jotai";
import { imageComponentsAtom } from "../../atoms/MapAtom";

const CreateMap = () => {
  //Map内のコンポーネントの配列
  const [imageComponents, setImageComponents] = useAtom(imageComponentsAtom);
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const { isValidDrop, addComponent } = useNewItem();

  const handleAdd = (e, item) => {
    // canvas外でドロップしてもcanvasComponentsには追加しない
    if(!isValidDrop(e, canvasRef)){
      return;
    }
    addComponent(item, canvasRef);
  };

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea
        ref={canvasRef}
      />
      <Sidebar handleAdd={handleAdd} />
    </div>
  );
};

export default CreateMap;
