import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import { Stage, Layer } from "react-konva";
import ImageComponent from "./ImageComponent";
import { useAtom } from "jotai";
import { imageComponentsAtom } from "../../atoms/MapAtom";
import { useNewItem } from "../../hooks/useNewItem";


const CanvasArea = ({}, canvasRef) => {
    const [selectedId, selectImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [imageComponents, setImageComponents] = useAtom(imageComponentsAtom);
    const { isValidDrop } = useNewItem();

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectImage(null);
        }
    };

    const removeOut = (e) => {
        setIsDragging(false);
        if(!isValidDrop(e.evt, canvasRef)){
            setImageComponents(imageComponents.filter(img => img.id !== e.target.attrs.id));
        }
    }

    const deleteImageComponent = (e) => {
        if(!isDragging && e.key == 'Backspace'){
            setImageComponents(imageComponents.filter(img => img.id !== selectedId));
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', deleteImageComponent)
        return () => {
            window.removeEventListener('keydown', deleteImageComponent);
        };
    },[selectedId, isDragging])

    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }} onDragOver={(e) => e.preventDefault()} >
                <Stage width={650} height={650} 
                    className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    onDragEnd={removeOut}
                    onDragStart={() => setIsDragging(true)}
                >
                    <Layer>
                        {imageComponents.map((img, i) => 
                        (
                            <ImageComponent
                                key={i}
                                imgProps={img}
                                isSelected={img.id === selectedId}
                                onSelect={() => {
                                    selectImage(img.id);
                                }}
                                onChange={(newAttrs) => {
                                    const items = imageComponents.slice();
                                    items.splice(i, 1);
                                    const item = newAttrs;
                                    items.push(item);
                                    setImageComponents(items);
                                }}
                            />
                        )
                        )}
                    </Layer>
                </Stage>
                <Buttons imageComponents={imageComponents} setImageComponents={setImageComponents} />
            </div>
        </div >
    );
}

export default CanvasArea;