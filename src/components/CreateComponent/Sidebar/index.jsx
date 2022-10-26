import React from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { userActionAtom } from "../../../atoms/Atoms";
import IconTab from "./IconTab";
import TextTab from "./TextTab";
import ImageTab from "./ImageTab";
import DrawingTab from "./DrawingTab";

const Sidebar = () => {
    const setUserAction = useSetAtom(userActionAtom);

    const chooseUserAction = (e) => {
        setUserAction(e.target.value);
    };

    return (
        <div style={{ width: 444 }}>
            <a
                className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href="_temp"
                style={{ width: 444 }}
            >
                Back to CreateMap
            </a>
            <div className="p-6 overflow-y-scroll bg-white rounded drop-shadow" style={{ height: 650 }}>
                <div className="w-5/6 mx-auto mb-6">
                    <div className="flex justify-between">
                        <button onClick={chooseUserAction} value="Text">Text 💬</button>
                        <button onClick={chooseUserAction} value="Icon">Icon 😄</button>
                        <button onClick={chooseUserAction} value="Image">Image 🏞</button>
                        <button onClick={chooseUserAction} value="drawing">Drawing</button>
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