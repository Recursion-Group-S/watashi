import { useAtom, useSetAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { canvasItemsAtom, stageRefAtom } from "../../atoms/ComponentAtom";
import { modalDispStatusAtom } from "../../atoms/ComponentAtom";

const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);
    const [saveButtonClass, setSaveButtonClass] = useState("border-zinc-400 bg-zinc-400 hover:text-white hover:bg-zinc-400 focus:outline-none cursor-not-allowed");
    const setModalDispStatus = useSetAtom(modalDispStatusAtom);

    const handleClear = () => {
        setCanvasItems([]);
        stageRef.current.children[0].children = [];
    }

    // const handleSave = (e) => {
    //     if (canvasItems.length === 0) return;
    //     e.target.disabled = true;
    //     saveMap();
    //     // Galleryに飛ばす
    //     setTimeout(() => {
    //         e.target.disabled = false;
    //     }, 4000);
    // }

    const displayModal = () => {
        setModalDispStatus("");
    }

    const controlSaveButtonClass = () => {
        if (canvasItems.length === 0) {
            setSaveButtonClass("border-zinc-400 bg-zinc-400 hover:text-white hover:bg-zinc-400 focus:outline-none cursor-not-allowed");
        } else {
            setSaveButtonClass("");
        }
    }

    useEffect(() => {
        controlSaveButtonClass();
    }, [canvasItems]);

    return (
        <div className="flex gap-4">
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded-2xl border border-zinc-800 px-12 py-2 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring active:bg-zinc-800"
                    onClick={handleClear}
                >
                    Clear All
                </button>
            </div>
            <div className="basis-1/2">
                <button
                    className={`${saveButtonClass} w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800`}
                    onClick={displayModal}
                    disabled={canvasItems.length === 0}
                >
                    Save
                </button>
            </div>
        </div >
    );
}

export default Buttons;