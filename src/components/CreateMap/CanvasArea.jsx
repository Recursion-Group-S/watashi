import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import CanvasComponent from "./CanvasComponent";


const CanvasArea = ({canvasComponents, setCanvasComponents }, canvasRef) => {
    const [maxZIndex, setMaxZIndex] = useState(1);
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    

    return (
        <div ref={canvasRef}>
            
            <div className="mx-auto" style={{ width: 650 }}>
                <div id="container" className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    style={{ height: 650, width: 650 }}
                    onDragOver={handleDragOver}
                >
                    {canvasComponents.map(component =>
                        <CanvasComponent key={component.id} component={component}
                                        maxZIndex={maxZIndex} setMaxZIndex={setMaxZIndex}
                                        canvasComponents={canvasComponents}
                                        setCanvasComponents={setCanvasComponents}
                        />
                    )}
                </div>
                <Buttons canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents} />
            </div>
        </div >
    );
}

export default CanvasArea;