import React from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { userActionAtom } from "../../../atoms/Atoms";
import IconTab from "./IconTab";
import TextTab from "./TextTab";
import ImageTab from "./ImageTab";
import DrawingTab from "./DrawingTab";

const Sidebar = () => {
    const setUserAction = useSetAtom(userActionAtom);

    const chooseUserAction = (userAction) => {
        setUserAction(userAction);
    };

    return (
        <div style={{ width: 444 }}>
            <a
                className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                href="/createMap"
                style={{ width: 444 }}
            >
                Back to CreateMap
            </a>
            <div className="p-6 overflow-y-scroll bg-white rounded drop-shadow" style={{ height: 650 }}>
                <div className="w-5/6 mx-auto mb-6">
                    <div className="flex justify-between">
                        <button>
                            <img onClick={() => chooseUserAction("Text")} className="w-6" src="https://cdn-icons-png.flaticon.com/512/3721/3721901.png" alt="text-button" />
                        </button>
                        <button>
                            <img onClick={() => chooseUserAction("Icon")} className="w-6" src="https://cdn-icons-png.flaticon.com/512/3260/3260867.png" alt="icon-button" />
                        </button>
                        <button>
                            <img onClick={() => chooseUserAction("Image")} className="w-6" src="https://cdn-icons-png.flaticon.com/512/4211/4211549.png" alt="image-button" />
                        </button>
                        <button>
                            <img onClick={() => chooseUserAction("drawing")} className="w-6" src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="image-button" />
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