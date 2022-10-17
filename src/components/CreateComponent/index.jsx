import React, { useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";


const CreateComponent = () => {
    const [userAction, setUserAction] = useState("Text");
    const [detailAction, setDetailAction] = useState("");
    const [fontFamily, setFontFamily] = useState("Times New Roman");

    return (
        <div className="flex gap-x-4">
            <CanvasArea userAction={userAction} setUserAction={setUserAction}
                        detailAction={detailAction} setDetailAction={setDetailAction} 
                        fontFamily={fontFamily} />
            <Sidebar userAction={userAction} setUserAction={setUserAction} 
                    detailAction={detailAction} setDetailAction={setDetailAction}
                    setFontFamily={setFontFamily} />
        </div>
    );
}

export default CreateComponent;