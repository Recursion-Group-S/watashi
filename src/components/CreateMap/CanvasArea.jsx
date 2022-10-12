import React, { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import CanvasComponent from "./CanvasComponent";

const CanvasArea = ({canvasComponents, setCanvasComponents}) => {
    const [maxZIndex, setMaxZIndex] = useState(1);
    const [topDiff, setTopDiff] = useState(null);
    const [sideDiff, setSideDiff] = useState(null);
    const canvasRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleClick = (e) =>{
        console.log(e.clientX + ", " + e.clientY);
    }

    window.addEventListener("scroll", function() {
        setTopDiff(canvasRef.current.getBoundingClientRect().top);
        setSideDiff(canvasRef.current.getBoundingClientRect().left);
    })

    window.addEventListener('resize', function(){
        setTopDiff(canvasRef.current.getBoundingClientRect().top);
        setSideDiff(canvasRef.current.getBoundingClientRect().left);
    })

    useEffect(() => {
        setTopDiff(canvasRef.current.getBoundingClientRect().top);
        setSideDiff(canvasRef.current.getBoundingClientRect().left);
    }, [])
    

    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }}>
                <div className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    style={{ height: 650, width: 650 }}
                    onDragOver={handleDragOver}
                    onClick={handleClick}
                >
                    {canvasComponents.map(component =>
                        <CanvasComponent key={component.id} component={component}
                                        maxZIndex={maxZIndex} setMaxZIndex={setMaxZIndex}
                                        canvasComponents={canvasComponents}
                                        setCanvasComponents={setCanvasComponents}
                                        topDiff={topDiff}
                                        sideDiff={sideDiff}
                        />
                    )}
                    
                </div>
                <Buttons canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents} />
            </div>
        </div >
    );
}

export default CanvasArea;