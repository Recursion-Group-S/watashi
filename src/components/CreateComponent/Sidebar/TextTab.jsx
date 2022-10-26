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
        <>
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-size</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5" type='number'
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
            <label className="block mb-1 text-sm font-medium text-gray-300">Select font-style</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5"
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
            <div className="flex justify-center">
                {fontStyle.indexOf('bold') === -1 ?
                    <button className="border m-1" style={{ width: 40, height: 40 }}
                        onClick={() => setFontStyle(fontStyle + 'bold ')}
                    ><b>B</b></button>
                    :
                    <button className="border m-1 bg-gray-200 border-black" style={{ width: 40, height: 40 }}
                        onClick={() => setFontStyle(fontStyle.replace('bold ', ''))}
                    ><b>B</b></button>
                }
                {fontStyle.indexOf('italic') === -1 ?
                    <button className="border m-1" style={{ width: 40, height: 40 }}
                        onClick={() => setFontStyle(fontStyle + 'italic ')}
                    ><i>I</i></button>
                    :
                    <button className="border m-1 bg-gray-200 border-black" style={{ width: 40, height: 40 }}
                        onClick={() => setFontStyle(fontStyle.replace('italic ', ''))}
                    ><i>I</i></button>
                }
                {!isUnderline ?
                    <button className="border m-1" style={{ width: 40, height: 40 }}
                        onClick={() => setIsUnderline(!isUnderline)}
                    ><u>U</u></button>
                    :
                    <button className="border m-1 bg-gray-200 border-black" style={{ width: 40, height: 40 }}
                        onClick={() => setIsUnderline(!isUnderline)}
                    ><u>U</u></button>
                }
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
};

export default TextTab;