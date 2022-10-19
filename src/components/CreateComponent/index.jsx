import React from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";


const CreateComponent = () => {
    return (
        <div className="flex gap-x-4">
            <CanvasArea />
            <Sidebar />
        </div>
    );
}

export default CreateComponent;