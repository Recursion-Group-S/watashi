import { useAtom } from "jotai";
import React from "react";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import { useSave } from "../../hooks/useSave";


const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const { saveMap } = useSave();

    const handleClear = () => {
        setCanvasItems([]);
    }

    const handleSave = (e) => {
        if (canvasItems.length === 0) return;
        e.target.disabled = true;
        saveMap();
        // Galleryに飛ばす
        setTimeout(() => {
            e.target.disabled = false;
        }, 5000);
    }
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
                    className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                    onClick={handleSave}
                >
                    Save Component
                </button>
            </div>
        </div>
    );
}

export default Buttons;