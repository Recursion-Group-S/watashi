import { useAtom } from "jotai";
import React from "react";
import { HexColorPicker } from "react-colorful";
import { userActionAtom } from "../../atoms/Atoms";
import { fontFamilyAtom, fontSizeAtom, sizeChangingAtom, textColorAtom } from "../../atoms/TextAtom";
import { useText } from "../../hooks/useText";

const Sidebar = () => {
    const [userAction, setUserAction] = useAtom(userActionAtom);
    const [, setSizeChanging] = useAtom(sizeChangingAtom);

    const chooseUserAction = (e) => {
        setUserAction(e.target.value);
    };


    const SidebarActions = () => {
        const [fontSize, setFontSize] = useAtom(fontSizeAtom);
        const [color, setColor] = useAtom(textColorAtom);
        const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
        const {addCanvasText} = useText();

        return (
            <>
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-size</label>
                <input className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5" type='number'
                    value={fontSize}
                    min="1" max='200'
                    onFocus={() => setSizeChanging(true)}
                    onBlur={() => setSizeChanging(false)}
                    onKeyDown={(e) => {
                        if(e.key == "Enter"){
                            document.activeElement.blur();
                        }
                    }}
                    onChange={(e) => setFontSize(e.target.value)}
                />
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-style</label>
            <select class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5"
                    value={fontFamily}
                    style={{fontFamily: fontFamily}}
                    onChange={(e) => setFontFamily(e.target.value)}>
                <option value="Potta One" style={{fontFamily: 'Potta One'}}>Potta One</option>
                <option value="Hachi Maru Pop" style={{fontFamily: 'Hachi Maru Pop'}}>Hachi Maru Pop</option>
                <option value="Yomogi" style={{fontFamily: 'Yomogi'}}>Yomogi</option>
                <option value="Hina Mincho" style={{fontFamily: 'Hina Mincho'}}>Hina Mincho</option>
                <option value="RocknRoll One" style={{fontFamily: 'RocknRoll One'}}>RocknRoll One</option>
            </select>
            <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-300">Select color</label>
                <HexColorPicker color={color} onChange={setColor}
                    style={{ width: "100%"}}    
                />
            </div>
                <button className={`bg-sky-600 text-white w-full border my-3 p-3 rounded`}
                    value="addText"
                    onClick={(e) => {
                        e.target.classList.add('bg-sky-800');
                        setTimeout(() => {
                            e.target.classList.remove('bg-sky-800');
                        }, 200);
                        addCanvasText();
                    }}>
                    Add Text
                </button>
            </>
        )
    }

    const DisplaySidebarContent = () => {
        
        if (userAction === "Text") {
            return (
                <div>
                    <SidebarActions />
                </div>
            );
        } else if (userAction === "Icon") {
            return (
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">Search icons</label>
                    <input type="text" className="mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" placeholder="Icon name"></input>
                    <div className="flex flex-wrap border rounded-lg p-2">
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
                        <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
                    </div>
                </div>
            );
        } else if (userAction === "Image") {
            return (
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">Upload images</label>
                    <input type="file" className="text-sm"></input>
                </div>
            );
        }
    }

    return (
        <div>
            <a
                className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href="_temp"
                style={{ width: 444 }}
            >
                Back to CreateMap
            </a>
            <div className="p-6 overflow-y-scroll bg-white rounded drop-shadow" style={{ height: 650 }}>
                <div className="w-5/6 mx-auto mb-6">
                    <div className="flex justify-between">
                        <button onClick={chooseUserAction} value="Text">Text 💬</button>
                        <button onClick={chooseUserAction} value="Icon">Icon 😄</button>
                        <button onClick={chooseUserAction} value="Image">Image 🏞</button>
                        <button onClick={chooseUserAction} value="Controller">Conroller</button>
                    </div>
                </div>
                <DisplaySidebarContent />
            </div>
        </div >
    );
}

export default Sidebar;