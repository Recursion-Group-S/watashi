import React from "react";
import { useState } from "react";
import { UploadImage } from "./UploadImage";

import FlaticonWrapper from "../../apis/flaticon.js";
import { canvasRefAtom, paintColorAtom, paintModeAtom, paintWidthAtom } from "../../atoms/ComponentAtom";
import { useAtom } from "jotai";
import { useNewItem } from "../../hooks/useNewItem";
import { userActionAtom } from "../../atoms/Atoms";
import { HexColorPicker } from "react-colorful"
import { fontFamilyAtom, fontSizeAtom, fontStyleAtom, isUnderlineAtom, sizeChangingAtom, textColorAtom } from "../../atoms/TextAtom";
import { useText } from "../../hooks/useText";

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.fetchIcons(searchTerm);
    };


    return (
        <>
            <form onSubmit={onFormSubmit}>
                <label className="block mb-1 text-sm font-medium text-gray-300">Search icons</label>
                <input
                    type="text"
                    className="mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                    value={searchTerm}
                    onChange={onInputChange}
                >
                </input>
            </form>
        </>
    );
}

const IconList = (props) => {
    const [canvasAtom] = useAtom(canvasRefAtom);
    const { isValidDrop, addItem } = useNewItem();
    const [shift, setShift] = useState({ x: 0, y: 0 });

    const handleShift = (e) => {
        setShift({
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top
        })
    }

    const addIcon = (e) => {
        e.preventDefault();
        if (!isValidDrop(e, canvasAtom)) {
            return;
        }

        let icon = props.icons.find(icon => icon.id === parseInt(e.target.id));
        let newIcon = {
            x: e.clientX - shift.x,
            y: e.clientY - shift.y,
            url: icon.images[256],
            type: 'icon'
        }
        addItem(newIcon, canvasAtom);
    }

    const renderedItem = props.icons.map((icon) => {
        return (
            <div
                key={icon.id}
                className="w-1/4 p-1 cursor-pointer"
            >
                <img
                    src={icon.images[256]}
                    className="mx-auto"
                    id={icon.id}
                    draggable
                    onDragEnd={addIcon}
                    onDragStart={handleShift}
                />
            </div>
        )
    });

    return (
        <div
            className="border rounded-lg p-3 overflow-y-scroll"
            style={{ height: 480 }}
        >
            <div className="flex flex-wrap">
                {renderedItem}
            </div >
        </div>
    );
};

const Sidebar = () => {
    const [userAction, setUserAction] = useAtom(userActionAtom);
    const [icons, setIcons] = useState([]);
    const [, setSizeChanging] = useAtom(sizeChangingAtom);

    const fetchIcons = async (searchTerm) => {
        const flatIcon = new FlaticonWrapper();
        const token = await flatIcon.getToken();
        const icons = await flatIcon.searchIcons(token, searchTerm);

        setIcons(icons.data);
    };

    const SidebarActions = () => {
        const [fontSize, setFontSize] = useAtom(fontSizeAtom);
        const [color, setColor] = useAtom(textColorAtom);
        const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
        const [fontStyle, setFontStyle] = useAtom(fontStyleAtom);
        const [isUnderline, setIsUnderline] = useAtom(isUnderlineAtom);
        const { addCanvasText } = useText();

        return (
            <>
                <label className="block mb-1 text-sm font-medium text-gray-300">Select font-size</label>
                <input className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5" type='number'
                    value={fontSize}
                    min="1" max='200'
                    onFocus={() => setSizeChanging(true)}
                    onBlur={() => setSizeChanging(false)}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            document.activeElement.blur();
                        }
                    }}
                    onChange={(e) => setFontSize(e.target.value)}
                />
                <label className="block mb-1 text-sm font-medium text-gray-300">Select font-style</label>
                <select class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full mb-3 p-2.5"
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
                    {fontStyle.indexOf('bold') == -1 ?
                        <button className="border m-1" style={{ width: 40, height: 40 }}
                            onClick={() => setFontStyle(fontStyle + 'bold ')}
                        ><b>B</b></button>
                        :
                        <button className="border m-1 bg-gray-200 border-black" style={{ width: 40, height: 40 }}
                            onClick={() => setFontStyle(fontStyle.replace('bold ', ''))}
                        ><b>B</b></button>
                    }
                    {fontStyle.indexOf('italic') == -1 ?
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
    }

    const chooseUserAction = (e) => {
        setUserAction(e.target.value);
    };

    const DisplaySidebarContent = () => {
        const [paintMode, setPaintMode] = useAtom(paintModeAtom);
        const [paintWidth, setPaintWidth] = useAtom(paintWidthAtom);
        const [paintColor, setPaintColor] = useAtom(paintColorAtom);

        if (userAction === "Text") {
            return (
                <div>
                    <SidebarActions />
                </div>
            );
        } else if (userAction === "Icon") {
            return (
                <div>
                    <SearchBar fetchIcons={fetchIcons} />
                    <IconList icons={icons} />
                </div>
            );
        } else if (userAction === "Image") {
            return <UploadImage />;
        } else if (userAction === 'drawing') {
            return (
                <div>
                    <div className="mb-2">
                        <select className="border rounded mr-2" value={paintMode} onChange={(e) => setPaintMode(e.target.value)}>
                            <option value="brush">brush</option>
                            <option value="eraser">erasor</option>
                        </select>
                        <input type="range" min='1' max='10'
                            value={paintWidth} onChange={(e) => setPaintWidth(e.target.value)} />
                    </div>
                    <HexColorPicker color={paintColor} onChange={setPaintColor} style={{ width: '100%' }} />
                </div>
            );
        }
    };

    return (
        <div style={{ width: 444 }}>
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
                        <button onClick={chooseUserAction} value="drawing">Drawing</button>
                    </div>
                </div>
                <DisplaySidebarContent />
            </div>
        </div >
    );
}

export default Sidebar;
