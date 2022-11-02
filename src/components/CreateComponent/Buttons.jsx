import { useAtom, useSetAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { canvasItemsAtom, stageRefAtom } from "../../atoms/ComponentAtom";
import { modalDispStatusAtom } from "../../atoms/ComponentAtom";
import { bgColorSettingAtom, canvasItemsAtom } from "../../atoms/ComponentAtom";
import { useSave } from "../../hooks/useSave";

const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    // const [stageRef] = useAtom(stageRefAtom);
    const [saveButtonClass, setSaveButtonClass] = useState("border-zinc-400 bg-zinc-400 hover:text-white hover:bg-zinc-400 focus:outline-none cursor-not-allowed");
    const setModalDispStatus = useSetAtom(modalDispStatusAtom);
    const { saveMap } = useSave();
    const [isColorSetting, setIsColorSetting] = useAtom(bgColorSettingAtom)

    const handleClear = () => {
        setCanvasItems([]);
    }

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
        <div className="m-0 p-0 h-12">
             
            <div className="flex gap-4">
                <div className="w-5/12">
                    <button
                        className="w-full text-center inline-block rounded-2xl border border-zinc-800 px-12 py-2 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring active:bg-zinc-800"
                        onClick={handleClear}
                    >
                        Clear All
                    </button>
                </div>
                <div className="w-5/12">
                    <button
                        className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                        onClick={displayModal}
                        disabled={canvasItems.length === 0}
                    >
                        Save
                    </button>
                </div>
                <div className="w-1/6">
                    <button
                        className="w-full text-center inline-block rounded-2xl h-10 border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                        onClick={() => {
                            setIsColorSetting(!isColorSetting)
                        }}
                        style={{background: "linear-gradient(60deg,#ffa07a, #ee82ee, #add8e6, #00ffff, #7fffd4,#ffff00, #ffa500)"}}
                    >
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Buttons;