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
                    className="w-full text-center inline-block rounded-2xl border border-zinc-800 px-12 py-2 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring active:bg-zinc-800"
                    onClick={() => setCanvasItems([])}
                >
                    Clear All
                </button>
            </div>
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
                    onClick={saveComponent}
                >
                    Save Component
                </button>
            </div>
        </div>
    );
}

export default Buttons;