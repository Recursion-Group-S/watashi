import React from "react";
import Buttons from "./Buttons";

const CanvasArea = ({}, canvasRef) => {
    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }}>
                <div className="bg-white w-full mb-2 rounded drop-shadow" style={{ height: 650, width: 650 }}>
                </div>
                <Buttons />
            </div>
        </div >
    );
}

export default CanvasArea;