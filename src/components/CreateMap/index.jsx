import React, { forwardRef, useRef, useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import uuid from "react-uuid";
import { useNewItem } from "../../hooks/useNewItem";
import { useAtom } from "jotai";
import { imageComponentsAtom } from "../../atoms/MapAtom";

const CreateMap = () => {
  //Map内のコンポーネントの配列
  const [imageComponents, setImageComponents] = useAtom(imageComponentsAtom);
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const { isValidDrop, createAddItem } = useNewItem();

  const addComponent = (e, item) => {
    // canvas外でドロップしてもcanvasComponentsには追加しない
    if(!isValidDrop(e, canvasRef)){
      return;
    }
    createAddItem(item, canvasRef, imageComponents, setImageComponents);
  };

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea
        ref={canvasRef}
      />
      <Sidebar addComponent={addComponent} />
    </div>
  );
};

export default CreateMap;
