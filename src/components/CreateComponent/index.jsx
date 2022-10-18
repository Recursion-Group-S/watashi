import React, { useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";


const CreateComponent = () => {
    const [userAction, setUserAction] = useState("Text");
    const [detailAction, setDetailAction] = useState("");
    const [fontFamily, setFontFamily] = useState("Potta One");
    const [color, setColor] = useState('#aaaaaa')
    const [fontSize, setFontSize] = useState(30);

    return (
        <div className="flex gap-x-4">
            <CanvasArea userAction={userAction}
                        detailAction={detailAction} setDetailAction={setDetailAction} 
                        fontFamily={fontFamily} setFontFamily={setFontFamily}
                        color={color} setColor={setColor}
                        fontSize={fontSize} setFontSize={setFontSize}
                        />
            <Sidebar userAction={userAction} setUserAction={setUserAction} 
                    detailAction={detailAction} setDetailAction={setDetailAction}
                    fontFamily={fontFamily} setFontFamily={setFontFamily} 
                    color={color} setColor={setColor}
                    fontSize={fontSize} setFontSize={setFontSize}
                    />
        </div>
    );
}

export default CreateComponent;