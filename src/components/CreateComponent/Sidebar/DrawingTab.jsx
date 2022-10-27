import React from "react";
import { useAtom } from "jotai";
import { paintColorAtom, paintModeAtom, paintWidthAtom } from "../../../atoms/ComponentAtom";
import { HexColorPicker } from "react-colorful"


const DrawingTab = () => {
    const [paintMode, setPaintMode] = useAtom(paintModeAtom);
    const [paintWidth, setPaintWidth] = useAtom(paintWidthAtom);
    const [paintColor, setPaintColor] = useAtom(paintColorAtom);

    return (
        <div>
            <div className="mb-2">
                <select className="border border-gray-300 rounded-lg px-2 py-1 mr-2" value={paintMode} onChange={(e) => setPaintMode(e.target.value)}>
                    <option value="brush">Brush</option>
                    <option value="eraser">Erasor</option>
                </select>
                <input type="range" min='1' max='10'
                    value={paintWidth} onChange={(e) => setPaintWidth(e.target.value)} />
            </div>
            <HexColorPicker color={paintColor} onChange={setPaintColor} style={{ width: '100%' }} />
        </div>
    );
}

export default DrawingTab;