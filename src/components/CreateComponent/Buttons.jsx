import { useAtom } from "jotai";
import React from "react";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";


const Buttons = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);

    const saveComponent = () => {
        console.log(canvasItems);
        // textもitemに入れる
    }
    return (
        <div className="flex gap-4">
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 px-12 py-2 text-sm font-medium text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-sky-600"
                    onClick={() => setCanvasItems([])}
                >
                    Clear All
                </button>
            </div>
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                    onClick={saveComponent}
                >
                    Save Component
                </button>
            </div>
        </div>
    );
}

export default Buttons;