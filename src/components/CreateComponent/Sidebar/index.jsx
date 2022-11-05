import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { userActionAtom } from "../../../atoms/Atoms";
import IconTab from "./IconTab";
import TextTab from "./TextTab";
import ImageTab from "./ImageTab";
import DrawingTab from "./DrawingTab";
import { useNavigate } from "react-router-dom/dist";

const Sidebar = () => {
    const [userAction, setUserAction] = useAtom(userActionAtom);

    const chooseUserAction = (action) => {
        setUserAction(action);
    };
    const navigate = useNavigate();

    return (
        <div style={{ width: 444 }}>
            <button
                className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                onClick={()=>navigate("/gallery")}
                style={{ width: 444 }}
            >
                Back to Gallery
            </button>
            <div className="mt-0 bg-white overflow-y-scroll rounded drop-shadow" style={{ height: 650 }}>
                <div className="mx-auto pt-3 rounded flex justify-center">
                    <div className="flex justify-between w-5/6">
                        <button className={`w-1/4 flex justify-center pt-4 pb-4 ${userAction === 'Text' ? 'border-b-4' : ''}`} style={{ borderColor: "#f6e8aa" }}
                             onClick={() => chooseUserAction("Text")}>
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/512/3721/3721901.png" alt="border" />
                        </button>
                        <button className={`w-1/4 flex justify-center pt-4 pb-4 ${userAction === 'Icon' ? 'border-b-4' : ''}`} style={{ borderColor: "#f6e8aa" }}
                            onClick={() => chooseUserAction("Icon")} >
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/512/3260/3260867.png" alt="icon-button" />
                        </button>
                        <button className={`w-1/4 flex justify-center pt-4 pb-4 ${userAction === 'Image' ? 'border-b-4' : ''}`} style={{ borderColor: "#f6e8aa" }}
                            onClick={() => chooseUserAction("Image")} >
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/512/4211/4211549.png" alt="image-button" />
                        </button>
                        <button className={`w-1/4 flex justify-center pt-4 pb-4 ${userAction === 'drawing' ? 'border-b-4' : ''}`} style={{ borderColor: "#f6e8aa" }}
                            onClick={() => chooseUserAction("drawing")} >
                            <img className="w-6" src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="image-button" />
                        </button>
                    </div>
                </div>
                <DisplaySidebarContent />
            </div>
        </div >
    );
}

export default Sidebar;

const DisplaySidebarContent = () => {
    const userAction = useAtomValue(userActionAtom);

    if (userAction === "Text") {
        return <TextTab />
    } else if (userAction === "Icon") {
        return <IconTab />;
    } else if (userAction === "Image") {
        return <ImageTab />;
    } else if (userAction === 'drawing') {
        return <DrawingTab />;
    }
};