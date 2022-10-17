import React, { useEffect, useState } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";


const CreateComponent = () => {
    const [userAction, setUserAction] = useState("addText");

    return (
        <div className="flex gap-x-4">
            <CanvasArea userAction={userAction} setUserAction={setUserAction} />
            <Sidebar userAction={userAction} setUserAction={setUserAction} />
        </div>
    );
}

export default CreateComponent;