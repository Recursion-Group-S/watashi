import { useAtom } from "jotai";
import React from "react";
import { bgColorSettingAtom, canvasItemsAtom } from "../../atoms/ComponentAtom";
import { useSave } from "../../hooks/useSave";

const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const { saveMap } = useSave();
    const [isColorSetting, setIsColorSetting] = useAtom(bgColorSettingAtom)

    const handleClear = () => {
        setCanvasItems([]);
    }

    const handleSave = (e) => {
        if (canvasItems.length === 0) return;
        e.target.disabled = true;
        saveMap();
        setTimeout(() => {
            e.target.disabled = false;
        }, 5000);
    }
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
                        onClick={handleSave}
                    >
                        Save Component
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