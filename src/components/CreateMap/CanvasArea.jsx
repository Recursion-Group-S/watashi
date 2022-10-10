import React, { useState } from "react";
import Buttons from "./Buttons";
import CanvasComponent from "./CanvasComponent";

const CanvasArea = ({canvasComponents, setCanvasComponents}) => {
    const [maxZIndex, setMaxZIndex] = useState(1);

    return (
        <div>
            <div className="mx-auto" style={{ width: 650 }}>
                <div className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    style={{ height: 650, width: 650 }}
                >
                    {canvasComponents.map(component =>
                        <CanvasComponent key={component.id} component={component}
                                        maxZIndex={maxZIndex} setMaxZIndex={setMaxZIndex}
                                        canvasComponents={canvasComponents}
                                        setCanvasComponents={setCanvasComponents}
                        />
                    )}
                    
                </div>
                <Buttons setCanvasComponents={setCanvasComponents} />
            </div>
        </div >
    );
}

export default CanvasArea;