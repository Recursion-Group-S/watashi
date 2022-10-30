import React from "react";
import { useAtom } from "jotai";
import { paintColorAtom, paintModeAtom, paintWidthAtom, stageRefAtom } from "../../../atoms/ComponentAtom";
import { HexColorPicker } from "react-colorful"
import { currentMapAtom } from "../../../atoms/CurrentMapAtom";


const DrawingTab = () => {
    const [paintMode, setPaintMode] = useAtom(paintModeAtom);
    const [paintWidth, setPaintWidth] = useAtom(paintWidthAtom);
    const [paintColor, setPaintColor] = useAtom(paintColorAtom);
    const [currentMap] = useAtom(currentMapAtom);
    const [stageRef] = useAtom(stageRefAtom)

    const handleBackground = (e) => {
        const value = e.target.style.backgroundColor;
        currentMap.backgroundColor = value;
        stageRef.current.container().style.backgroundColor = value;
    }

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
            <label className="block mt-3 mb-2 text-sm font-medium text-gray-300">Background Type</label>
            <div className="flex ">
                <div className="m-1 border" style={{backgroundColor: '#FFFFE0', width: '20%', height: 70}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#FFC0CB', width: '20%', height: 70}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#FFA07A', width: '20%', height: 70}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#D8BFD8', width: '20%', height: 70}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#E0FFFF', width: '20%', height: 70}} onClick={handleBackground} />
            </div>
        </div>
    );
}

export default DrawingTab;