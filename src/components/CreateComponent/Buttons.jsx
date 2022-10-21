import { useAtom } from "jotai";
import React from "react";
import { canvasLinesAtom, iconsAndImagesAtom } from "../../atoms/ComponentAtom";


const Buttons = () => {
    const [iconsAndImages, setIconsAndImages] = useAtom(iconsAndImagesAtom);
    const [canvasLines, setCanvasLines] = useAtom(canvasLinesAtom);
    // text

    const saveComponent = () => {
        console.log(iconsAndImages);
        console.log(canvasLines);
        // text
    }
    return (
        <div className="flex gap-4">
            <div className="basis-1/2">
                <a
                    className="w-full text-center inline-block rounded border border-sky-600 px-12 py-2 text-sm font-medium text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-sky-600"
                    onClick={() => setIconsAndImages([])}
                >
                    Clear All
                </a>
            </div>
            <div className="basis-1/2">
                <a
                    className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                    // href="/download"
                    onClick={saveComponent}
                >
                    Save Component
                </a>
            </div>
        </div>
    );
}

export default Buttons;