import React from "react";
import { useAtom } from "jotai";
import { backgroundImageAtom, paintColorAtom, paintModeAtom, paintWidthAtom, stageRefAtom } from "../../../atoms/ComponentAtom";
import { HexColorPicker } from "react-colorful"
import { currentMapAtom } from "../../../atoms/CurrentMapAtom";


const DrawingTab = () => {
    const [paintMode, setPaintMode] = useAtom(paintModeAtom);
    const [paintWidth, setPaintWidth] = useAtom(paintWidthAtom);
    const [paintColor, setPaintColor] = useAtom(paintColorAtom);
    const [currentMap] = useAtom(currentMapAtom);
    const [stageRef] = useAtom(stageRefAtom);
    const [backgroundImage, setBgImg] = useAtom(backgroundImageAtom)

    const handleBackground = (e) => {
        setBgImg(new Image())
        const value = e.target.style.backgroundColor;
        currentMap.backgroundColor = value;
        stageRef.current.container().style.backgroundColor = value;
    }

    const handleBgStyle = (e) => {
        let newImg = new Image();
        newImg.src = e.target.value;
        setBgImg(newImg)
        currentMap.backgroundColor = 'white';
        stageRef.current.container().style.backgroundColor = 'white'
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
            <div className="flex">
                <div className="m-1 border" style={{backgroundColor: '#FFFFFF', width: '15%', height: 55}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#FFFFE0', width: '15%', height: 55}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#FFC0CB', width: '15%', height: 55}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#FFA07A', width: '15%', height: 55}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#D8BFD8', width: '15%', height: 55}} onClick={handleBackground} />
                <div className="m-1 border" style={{backgroundColor: '#E0FFFF', width: '15%', height: 55}} onClick={handleBackground} />
            </div>
            <label className="block mt-3 mb-2 text-sm font-medium text-gray-300">Background Style</label>
            <div className="flex">
                <select className="border border-gray-300 rounded-lg px-2 py-1 mr-2" onChange={handleBgStyle}>
                    <option value=""
                        >normal</option>          
                    <option value="https://firebasestorage.googleapis.com/v0/b/watashi-1d6aa.appspot.com/o/images%2FH1fCgz3jWpgOn4nugDkJF6Dqq0D3%2Ffg9elbeh.webp?alt=media&token=dafaa98e-6bc8-4dc6-b5ad-dcac831b3cba"
                        >paper</option>
                    <option value="https://firebasestorage.googleapis.com/v0/b/watashi-1d6aa.appspot.com/o/images%2FH1fCgz3jWpgOn4nugDkJF6Dqq0D3%2Focqolnic.jpg?alt=media&token=b2e6dcc4-8394-4f72-89fd-5107dc39a7b4"
                        >wood</option>
                    <option value="https://firebasestorage.googleapis.com/v0/b/watashi-1d6aa.appspot.com/o/images%2FH1fCgz3jWpgOn4nugDkJF6Dqq0D3%2Flywwmck8.jpg?alt=media&token=8651f699-e012-46d1-a16b-c39f7eefabce"
                        >brick</option>
                </select>
            </div>
            
        </div>
    );
}
export default DrawingTab;