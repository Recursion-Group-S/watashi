import React from "react";

import CanvasArea from "./CanvasArea";
import Buttons from "./Buttons";
import Sidebar from "./Sidebar";

const CreateMap = () => {
    return (
        <div className="flex">
            <div className="basis-2/3">
                <CanvasArea />
            </div>
            <div className="basis-1/3">
                <Sidebar />
            </div>
        </div>
    );
}

export default CreateMap;