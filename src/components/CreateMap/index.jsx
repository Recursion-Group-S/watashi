import React, { forwardRef, useRef, useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";

const CreateMap = () => {
    //Map内のコンポーネントの配列
    const [imageComponents, setImageComponents] = useState([]);
    const WrappedCanvasArea = forwardRef(CanvasArea);
    const canvasRef = useRef();
    const [currentID, setCurrentId] = useState(1);

    const addComponent = (e, item)=>{
        // canvas外でドロップしてもcanvasComponentsには追加しない
        let topOver = e.clientY < canvasRef.current.getBoundingClientRect().top;
        let leftOver = e.clientX < canvasRef.current.getBoundingClientRect().left;
        let bottomOver = e.clientY > canvasRef.current.getBoundingClientRect().bottom;
        let rightOver = e.clientX > canvasRef.current.getBoundingClientRect().right;
        if(topOver || leftOver || bottomOver || rightOver){
            return;
        }
        let newComponent = {
            x: item.x - canvasRef.current.getBoundingClientRect().left,
            y: item.y - canvasRef.current.getBoundingClientRect().top,
            width: 220,
            height: 220,
            rotation: 0,
            url: item.url,
            id: currentID.toString(),
        }
        setCurrentId(currentID + 1);
        setImageComponents([...imageComponents, newComponent]);
    }



    return (
        <div className="flex gap-x-4">
            <WrappedCanvasArea imageComponents={imageComponents} setImageComponents={setImageComponents}
                                ref={canvasRef}  />
            <Sidebar addComponent={addComponent} />
        </div>
    );
}

export default CreateMap;