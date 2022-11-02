import React from "react";
import { useAtom } from "jotai";
import { canvasItemsAtom, paintColorAtom, paintModeAtom, paintWidthAtom } from "../../../atoms/ComponentAtom";
import { HexColorPicker } from "react-colorful"
import { IconContext } from "react-icons";
import { BiUndo, BiRedo } from 'react-icons/bi'
import { useState } from "react";


const DrawingTab = () => {
    const [paintMode, setPaintMode] = useAtom(paintModeAtom);
    const [paintWidth, setPaintWidth] = useAtom(paintWidthAtom);
    const [paintColor, setPaintColor] = useAtom(paintColorAtom);
    const [undoCount, setUndoCount] = useState(0);
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);

    const undoLine = () => {
        let line = canvasItems.slice().reverse().find(item => item.type === 'line');
        line.type = 'null'
        setCanvasItems(canvasItems.map(item => item.id === line.id ? line : item));
        setUndoCount(undoCount + 1);
    }

    const redoLine = () => {
        let line = canvasItems.find(item => item.type === 'null');
        line.type = 'line';
        setCanvasItems(canvasItems.map(item => item.id === line ? line : item));
        setUndoCount(undoCount - 1);
    }

    return (
        <div>
            <div className="mb-2 flex">
                <select className="border border-gray-300 rounded-lg px-2 py-1 mr-2" value={paintMode} onChange={(e) => setPaintMode(e.target.value)}>
                    <option value="brush">Brush</option>
                    <option value="eraser">Erasor</option>
                </select>
                <input type="range" min='1' max='10'
                    value={paintWidth} onChange={(e) => setPaintWidth(e.target.value)} />
                <div className="flex ml-2">
                    <button className="m-1" disabled={!canvasItems.filter(item => item.type === 'line').length} onClick={undoLine}>
                        <IconContext.Provider value={{ color: canvasItems.filter(item => item.type === 'line').length ? 'black' : 'gray', size: '40px'}}>
                            <BiUndo />
                        </IconContext.Provider>
                    </button>
                    <button className="m-1" disabled={undoCount <= 0} onClick={redoLine}>
                        <IconContext.Provider value={{ color: undoCount <= 0 ? 'gray': 'black', size: '40px'}}>
                            <BiRedo />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
            <HexColorPicker color={paintColor} onChange={setPaintColor} style={{ width: '100%' }} />
        </div>
    );
}

export default DrawingTab;