import React, { useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";

const CreateMap = () => {
    const [canvasComponents, setCanvasComponents] = useState([])
    const [currentID, setCurrentId] = useState(1);

    // コンポーネントのデータ構造が不明なので仮のコンポーネントオブジェクトを作成
    // これはキャンバス内に含まれているコンポーネントのリスト
    const addComponent = (e, color)=>{
        // canvas外でドロップしてもcanvasComponentsには追加しない
        if(e.clientX >= 650 || e.clientY < 85 || e.clientY > 500){
            return;
        }
        let newComponent = {
            color: color,
            x: e.clientX - 75,
            y: e.clientY - 100,
            id: currentID
        }
        setCurrentId(currentID + 1);
        setCanvasComponents([...canvasComponents, newComponent]);
    }

    return (
        <div className="flex gap-x-4">
            <CanvasArea canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents} />
            <Sidebar addComponent={addComponent} />
        </div>
    );
}

export default CreateMap;