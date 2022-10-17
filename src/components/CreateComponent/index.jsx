import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useAuth } from "../../hooks/useAuth";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";


const CreateComponent = () => {
    const [userAction, setUserAction] = useState("addText");
    const navigate = useNavigate();
    const { userAuth } = useAuth();
    useEffect(() => {
        if(!userAuth)navigate("/")
    })

    return (
        <div className="flex gap-x-4">
            <CanvasArea userAction={userAction} setUserAction={setUserAction} />
            <Sidebar userAction={userAction} setUserAction={setUserAction} />
        </div>
    );
}

export default CreateComponent;