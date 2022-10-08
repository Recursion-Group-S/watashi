import React from "react";

import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";

const CreateMap = () => {
    return (
        <div className="flex gap-x-4">
            <CanvasArea />
            <Sidebar />
        </div>
    );
}

export default CreateMap;