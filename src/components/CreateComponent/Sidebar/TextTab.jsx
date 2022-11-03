import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { HexColorPicker } from "react-colorful"
import { fontFamilyAtom, fontSizeAtom, fontStyleAtom, isUnderlineAtom, sizeChangingAtom, textColorAtom } from "../../../atoms/TextAtom";
import { useText } from "../../../hooks/useText";

const TextTab = () => {
    const [fontSize, setFontSize] = useAtom(fontSizeAtom);
    const [color, setColor] = useAtom(textColorAtom);
    const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
    const [fontStyle, setFontStyle] = useAtom(fontStyleAtom);
    const [isUnderline, setIsUnderline] = useAtom(isUnderlineAtom);
    const { addCanvasText } = useText();
    const setSizeChanging = useSetAtom(sizeChangingAtom);

    return (
        <div className="bg-white px-8 pt-2 pb-0 rounded-xl" style={{height: 577}}>
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-size</label>
            <div className="flex">
                <input className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full mb-3 p-2.5" type='number'
                    value={fontSize}
                    min="1" max='200'
                    onFocus={() => setSizeChanging(true)}
                    onBlur={() => setSizeChanging(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            document.activeElement.blur();
                        }
                    }}
                    onChange={(e) => setFontSize(e.target.value)}
                />
                <div>
                    <div className="flex">
                        {fontStyle.indexOf('bold') === -1 ?
                            <button className="border m-1 w-10 h-10 rounded"
                                onClick={() => setFontStyle(fontStyle + 'bold ')}
                            ><b>B</b></button>
                            :
                            <button className="border m-1 w-10 h-10 rounded border-zinc-800" style={{ backgroundColor: "#f6e8aa" }}
                                onClick={() => setFontStyle(fontStyle.replace('bold ', ''))}
                            ><b>B</b></button>
                        }
                        {fontStyle.indexOf('italic') === -1 ?
                            <button className="border m-1 w-10 h-10 rounded"
                                onClick={() => setFontStyle(fontStyle + 'italic ')}
                            ><i>I</i></button>
                            :
                            <button className="border m-1 w-10 h-10 rounded border-zinc-800" style={{ backgroundColor: "#f6e8aa" }}
                                onClick={() => setFontStyle(fontStyle.replace('italic ', ''))}
                            ><i>I</i></button>
                        }
                        {!isUnderline ?
                            <button className="border m-1 w-10 h-10 rounded"
                                onClick={() => setIsUnderline(!isUnderline)}
                            ><u>U</u></button>
                            :
                            <button className="border m-1 w-10 h-10 rounded border-zinc-800" style={{ backgroundColor: "#f6e8aa" }}
                                onClick={() => setIsUnderline(!isUnderline)}
                            ><u>U</u></button>
                        }
                    </div>
                </div>
            </div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-style</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full mb-3 p-2.5"
                value={fontFamily}
                style={{ fontFamily: fontFamily }}
                onChange={(e) => setFontFamily(e.target.value)}>
                <option value="Potta One" style={{ fontFamily: 'Potta One' }}>Potta One</option>
                <option value="Hachi Maru Pop" style={{ fontFamily: 'Hachi Maru Pop' }}>Hachi Maru Pop</option>
                <option value="Yomogi" style={{ fontFamily: 'Yomogi' }}>Yomogi</option>
                <option value="Hina Mincho" style={{ fontFamily: 'Hina Mincho' }}>Hina Mincho</option>
                <option value="RocknRoll One" style={{ fontFamily: 'RocknRoll One' }}>RocknRoll One</option>
            </select>
            <div className="mb-3">
                <label className="block mb-1 text-sm font-medium text-gray-300">Select color</label>
                <HexColorPicker color={color} onChange={setColor}
                    style={{ width: "100%" }}
                />
            </div>

            <button className="bg-zinc-800 text-white w-full border border-zinc-800 mt-2 py-2 rounded-2xl hover:bg-white hover:text-zinc-800"
                value="addText"
                onClick={() => addCanvasText()}
            >
                Add Text
            </button>

        </div>
    )
};

export default TextTab;