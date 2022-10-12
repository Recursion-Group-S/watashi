import React, { forwardRef, useRef, useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";

const CreateMap = () => {
    const [canvasComponents, setCanvasComponents] = useState([])
    const [currentID, setCurrentId] = useState(1);

    const WrappedCanvasArea = forwardRef(CanvasArea);
    const canvasRef = useRef();

    // コンポーネントのデータ構造が不明なので仮のコンポーネントオブジェクトを作成
    // これはキャンバス内に含まれているコンポーネントのリスト
    const addComponent = (e, x, y, color)=>{
        // canvas外でドロップしてもcanvasComponentsには追加しない
        let topOver = e.clientY < canvasRef.current.getBoundingClientRect().top;
        let leftOver = e.clientX < canvasRef.current.getBoundingClientRect().left;
        let bottomOver = e.clientY > canvasRef.current.getBoundingClientRect().bottom;
        let rightOver = e.clientX > canvasRef.current.getBoundingClientRect().right;
        if(topOver || leftOver || bottomOver || rightOver){
            return;
        }
        let newComponent = {
            color: color,
            x: x - canvasRef.current.getBoundingClientRect().left,
            y: y - canvasRef.current.getBoundingClientRect().top,
            zIndex: 1,
            id: currentID
        }
        setCurrentId(currentID + 1);
        setCanvasComponents([...canvasComponents, newComponent]);
    }



    return (
        <div className="flex gap-x-4">
            {/* <CanvasArea canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents} /> */}
            <WrappedCanvasArea canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents}
                                ref={canvasRef}  />
            <Sidebar addComponent={addComponent} />
        </div>
    );
}

export default CreateMap;