import React, { useState, useEffect, useRef } from "react";
import Buttons from "./Buttons";
import { Stage, Layer, Line } from "react-konva";
import { useAtom } from "jotai";
import { canvasLinesAtom, iconsAndImagesAtom } from "../../atoms/ComponentAtom";
import ImageComponent from "../CreateMap/ImageComponent";
import { useNewItem } from "../../hooks/useNewItem";
import { useDrawing } from "../../hooks/useDrawing";
import { userActionAtom } from "../../atoms/Atoms";

const CanvasArea = ({}, canvasRef) => {
    const [selectedId, selectImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [iconsAndImages, setIconsAndImages] = useAtom(iconsAndImagesAtom);
    const [canvasLines] = useAtom(canvasLinesAtom);
    const [userAction, setUserAction] = useAtom(userActionAtom);
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
            setIconsAndImages(iconsAndImages.filter(item => item.id !== e.target.attrs.id));
        }
    }

    const deleteItem = (e) => {
        if(!isDragging && e.key == 'Backspace'){
            setIconsAndImages(iconsAndImages.filter(item => item.id !== selectedId));
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', deleteItem)
        return () => {
            window.removeEventListener('keydown', deleteItem);
        };
    },[selectedId, isDragging])

    useEffect(() => {
        
    }, [iconsAndImages, canvasLines])

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
                        {iconsAndImages.map((image, i) => (
                            <ImageComponent
                            key={image.id}
                            id={image.id}
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
                        {canvasLines.map(line => (
                            <Line
                                key={line.id}
                                id="line"
                                stroke={line.stroke}
                                strokeWidth={line.strokeWidth}
                                globalCompositeOperation={line.globalCompositeOperation}
                                lineCap={line.lineCap}
                                lineJoin={line.lineJoin}
                                points={line.points}
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