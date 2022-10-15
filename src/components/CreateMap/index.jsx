
import React, { forwardRef, useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useAuth } from "../../hooks/useAuth";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import uuid from 'react-uuid'

const CreateMap = () => {
    //Map内のコンポーネントの配列
    const [imageComponents, setImageComponents] = useState([]);
    const WrappedCanvasArea = forwardRef(CanvasArea);
    const canvasRef = useRef();
    const navigate = useNavigate();
    const { userAuth } = useAuth();

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
            id: uuid(),
        }
        setImageComponents([...imageComponents, newComponent]);
    }
      useEffect(() => {
    if (!userAuth) navigate("/");
  });

    return (
        <div className="flex gap-x-4">
            <WrappedCanvasArea imageComponents={imageComponents} setImageComponents={setImageComponents}
                                ref={canvasRef}  />
            <Sidebar addComponent={addComponent} />
        </div>
    );
}
 



export default CreateMap;
