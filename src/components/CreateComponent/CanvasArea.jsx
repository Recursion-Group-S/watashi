import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import { Stage, Layer } from "react-konva";
import { useAtom } from "jotai";
import { iconsAndImagesAtom } from "../../atoms/ComponentAtom";
import ImageComponent from "../CreateMap/ImageComponent";

const CanvasArea = ({}, canvasRef) => {
    const [selectedId, selectImage] = useState(null);
    const [iconsAndImages, setIconsAndImages] = useAtom(iconsAndImagesAtom);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectImage(null);
        }
    };

    const deleteItem = () => {
        setIconsAndImages(iconsAndImages.filter(item => item.id !== selectedId));
    }

    useEffect(() => {
        window.addEventListener('keydown', deleteItem)
        return () => {
            window.removeEventListener('keydown', deleteItem);
        };
    },[selectedId])

    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }} onDragOver={(e) => e.preventDefault()}>
                <Stage width={650} height={650} 
                    className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                >
                    <Layer>
                        {iconsAndImages.map((image, i) => (
                            <ImageComponent
                            key={image.id}
                            imgProps={image}
                            isSelected={image.id === selectedId}
                            onSelect={() => {
                                selectImage(image.id);
                            }}
                            onChange={(newAttrs) => {
                                const items = iconsAndImages.slice();
                                items.splice(i, 1);
                                const item = newAttrs;
                                items.push(item);
                                setIconsAndImages(items);
                            }}
                        />
                        ))}
                    </Layer>
                </Stage>
                <Buttons />
            </div>
        </div >
    );
}

export default CanvasArea;