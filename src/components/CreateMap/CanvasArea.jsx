import React, { useState } from "react";
import Buttons from "./Buttons";
import { Stage, Layer } from "react-konva";
import ImageComponent from "./ImageComponent";


const CanvasArea = ({ imageComponents, setImageComponents }, canvasRef) => {
    const [selectedId, selectImage] = useState(null);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectImage(null);
        }
    };

    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }} onDragOver={(e) => e.preventDefault()} >
                <Stage width={650} height={650} 
                    className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
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
                                imageComponents={imageComponents}
                                setImageComponents={setImageComponents}
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