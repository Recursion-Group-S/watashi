import { useAtom } from "jotai";
import React from "react";
import { canvasItemsAtom, stageRefAtom } from "../../atoms/ComponentAtom";
import { useSave } from "../../hooks/useSave";


const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);
    const { saveComponent } = useSave();

    const handleClear = () => {
        setCanvasItems([]);
        stageRef.current.children[0].children = [];
    }

    const handleSave = (e) => {
        if(canvasItems.length === 0) return;
        e.target.disabled = true;
        saveComponent();
        // Galleryに飛ばす
        setTimeout(() => {
            e.target.disabled = false;
        }, 5000);
    }
    return (
        <div className="flex gap-4">
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 px-12 py-2 text-sm font-medium text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-sky-600"
                    onClick={handleClear}
                >
                    Clear All
                </button>
            </div>
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600 disabled:bg-sky-900"
                    onClick={handleSave}
                >
                    Save Component
                </button>
            </div>
        </div>
    );
}

export default Buttons;