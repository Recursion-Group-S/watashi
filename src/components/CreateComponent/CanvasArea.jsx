import React, { useState, useEffect, useRef } from "react";
import Buttons from "./Buttons";
import { Stage, Layer, Line } from "react-konva";
import { useAtom } from "jotai";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import ImageComponent from "../CreateMap/ImageComponent";
import { useNewItem } from "../../hooks/useNewItem";
import { useDrawing } from "../../hooks/useDrawing";
import { userActionAtom } from "../../atoms/Atoms";

const CanvasArea = ({}, canvasRef) => {
    const [selectedId, selectImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [userAction] = useAtom(userActionAtom);
    const stageRef = useRef(null);
    const { isValidDrop } = useNewItem();
    const { startDrawing, endDrawing, moveDrawing } = useDrawing();

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectImage(null);
        }
    };

    const handleMouseDown = (e) => {
        if(userAction == 'drawing'){
            startDrawing(stageRef);
        }
        checkDeselect(e);
    }

    const handleMouseMove = (e) => {
        if(userAction == 'drawing') {
            let lines = stageRef.current.children[0].children.filter(child => child.attrs.id == 'line');
            moveDrawing(e, stageRef, lines);
        }
    }

    const removeOut = (e) => {
        setIsDragging(false);
        if(!isValidDrop(e.evt, canvasRef)){
            setCanvasItems(canvasItems.filter(item => item.id !== e.target.attrs.id));
        }
    }

    const deleteItem = (e) => {
        if(!isDragging && e.key == 'Backspace'){
            setCanvasItems(canvasItems.filter(item => item.id !== selectedId));
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', deleteItem)
        return () => {
            window.removeEventListener('keydown', deleteItem);
        };
    },[selectedId, isDragging])


    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }} onDragOver={(e) => e.preventDefault()}>
                <Stage width={650} height={650} 
                    className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseUp={endDrawing}
                    onTouchEnd={endDrawing}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={removeOut}
                    ref={stageRef}
                >
                    <Layer>
                        {canvasItems.map((item, i) => (
                            item.type == 'line' ?
                            <Line
                                key={item.id}
                                id={item.type}
                                stroke={item.stroke}
                                strokeWidth={item.strokeWidth}
                                globalCompositeOperation={item.globalCompositeOperation}
                                lineCap={item.lineCap}
                                lineJoin={item.lineJoin}
                                points={item.points}
                            /> 
                            :
                            <ImageComponent
                                key={item.id}
                                id={item.type}
                                imgProps={item}
                                isSelected={item.id === selectedId}
                                onSelect={() => {
                                    selectImage(item.id);
                                }}
                                onChange={(newAttrs) => {
                                    const images = canvasItems.slice();
                                    images.splice(i, 1);
                                    const image = newAttrs;
                                    images.push(image);
                                    setCanvasItems(images);
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