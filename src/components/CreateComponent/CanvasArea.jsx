import React, { useState, useEffect, useRef } from "react";
import Buttons from "./Buttons";
import { Stage, Layer, Line, Image, Rect } from "react-konva";
import { useAtom, useAtomValue } from "jotai";
import { backgroundImageAtom, bgColorSettingAtom, canvasItemsAtom, selectedIDAtom, stageRefAtom } from "../../atoms/ComponentAtom";
import ImageComponent from "./ImageComponent";
import { useNewItem } from "../../hooks/useNewItem";
import { useDrawing } from "../../hooks/useDrawing";
import { userActionAtom } from "../../atoms/Atoms";
import TextComponent from "./TextComponent";
import { fontFamilyAtom, fontSizeAtom, fontStyleAtom, inputPositionAtom, isUnderlineAtom, selectedTextAtom, sizeChangingAtom, textColorAtom, textComponentsAtom } from "../../atoms/TextAtom";
import { currentMapAtom } from "../../atoms/CurrentMapAtom";
import { HexColorPicker } from "react-colorful"


const CanvasArea = ({ }, canvasRef) => {
    const [inputPosition] = useAtom(inputPositionAtom);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedText, setSelectedText] = useAtom(selectedTextAtom);
    const [, setTextContent] = useState(null);
    const [, setStageRefAtom] = useAtom(stageRefAtom);
    const [hidingElement, setHidingElement] = useState([]);
    const [color, setColor] = useAtom(textColorAtom);
    const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
    const [fontSize, setFontSize] = useAtom(fontSizeAtom);
    const [fontStyle, setFontStyle] = useAtom(fontStyleAtom);
    const [isUnderline, setIsUnderline] = useAtom(isUnderlineAtom);
    const [sizeChanging] = useAtom(sizeChangingAtom);
    const textAreaRef = useRef();

    const [selectedId, selectImage] = useAtom(selectedIDAtom);
    const [isDragging, setIsDragging] = useState(false);
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [userAction] = useAtom(userActionAtom);
    const [currentMap] = useAtom(currentMapAtom)
    const stageRef = useRef(null);
    const backgroundRef = useRef(null)
    const backgroundImage = useAtomValue(backgroundImageAtom)
    const { isValidDrop } = useNewItem();
    const { startDrawing, endDrawing, moveDrawing } = useDrawing();
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [isBgColorSetting] = useAtom(bgColorSettingAtom)
 

    function cancelSelectedText() {
        if (hidingElement) {
            for (let ele of hidingElement) {
                ele.show();
            }
        }
        setIsTyping(false);
        setSelectedText(null);
        setHidingElement([]);
    }


    const handleTextKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey || e.key === 'Escape') {
            cancelSelectedText();
        }
    }

    const handleClick = (e) => {
        if (selectedText && (e.target == stageRef.current || e.target === backgroundRef.current)){
            cancelSelectedText();
        }
    }

    useEffect(() => {
        if (isTyping) {
            let end = textAreaRef.current.value.length;
            textAreaRef.current.setSelectionRange(end, end);
            textAreaRef.current.focus();
        }
        if (selectedText) {
            setFontFamily(selectedText.fontFamily);
            setFontSize(selectedText.fontSize);
            setColor(selectedText.color);
            setFontStyle(selectedText.fontStyle);
            setIsUnderline(selectedText.isUnderline);
        }
    }, [isTyping, selectedText, sizeChanging])

    useEffect(() => {
        if (selectedText) {
            selectedText.fontFamily = fontFamily;
            setCanvasItems([...canvasItems]);
        }
    }, [fontFamily])

    useEffect(() => {
        if (selectedText) {
            selectedText.color = color;
        }
    }, [color])

    useEffect(() => {
        if (selectedText) {
            selectedText.fontSize = fontSize;
        }
    }, [fontSize])

    useEffect(() => {
        if (selectedText) {
            selectedText.fontStyle = fontStyle;
            setCanvasItems([...canvasItems]);
        }
    }, [fontStyle])

    useEffect(() => {
        if (selectedText) {
            selectedText.isUnderline = isUnderline;
            setCanvasItems([...canvasItems]);
        }
    }, [isUnderline])

    const checkDeselect = (e) => {
        // const clickedOnEmpty = e.target === e.target.getStage();
        const clickedOnEmpty = e.target === backgroundRef.current;
        if (clickedOnEmpty) {
            selectImage(null);
        }
    };

    const handleMouseDown = (e) => {
        if (userAction === 'drawing') {
            startDrawing(stageRef);
        }
        checkDeselect(e);
    }

    const handleMouseMove = (e) => {
        if (userAction === 'drawing') {
            let lines = stageRef.current.children[0].children.filter(child => child.attrs.id === 'line');
            moveDrawing(e, stageRef, lines);
        }
    }

    const removeOut = (e) => {
        setIsDragging(false);
        if (!isValidDrop(e.evt, canvasRef)) {
            setCanvasItems(canvasItems.filter(item => item.id !== e.target.attrs.id));
        }
    }

    const deleteItem = (e) => {
        if (!isDragging && e.key === 'Backspace' && selectedId) {
            setCanvasItems(canvasItems.filter(item => item.id != selectedId));
            selectImage(null)
        }
        if (e.key === "Backspace" && selectedText && !isTyping && !sizeChanging) {
            setCanvasItems(canvasItems.filter(item => item.id != selectedText.id))
            cancelSelectedText();
        }
    }

    useEffect(() => {
        setStageRefAtom(stageRef);
        stageRef.current.container().style.backgroundColor = currentMap.backgroundColor;
    },[])

    useEffect(() => {
        window.addEventListener('keydown', deleteItem)
        return () => {
            window.removeEventListener('keydown', deleteItem);
        };
    }, [selectedId, isDragging, isTyping, selectedText, sizeChanging])

    useEffect(() => {
        currentMap.backgroundColor = bgColor;
    },[bgColor])


    return (
        <div ref={canvasRef}>
            <div className="mx-auto" style={{ width: 650 }} onDragOver={(e) => e.preventDefault()}>
                <Stage width={650} height={650}
                    className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseUp={endDrawing}
                    onTouchEnd={endDrawing}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={removeOut}
                    onClick={handleClick}
                    ref={stageRef}
                >
                    <Layer>
                        <Rect
                            x={0}
                            y={0}
                            width={650}
                            height={650}
                            fill={currentMap.backgroundColor}
                        />
                        <Image
                            width={650}
                            height={650}
                            image={backgroundImage}
                            ref={backgroundRef}
                        />
                        {canvasItems.map((item, i) => (
                            item.type === 'line' ?
                                <Line
                                    key={item.id}
                                    id={item.type}
                                    stroke={item.color}
                                    strokeWidth={item.width}
                                    globalCompositeOperation={item.globalCompositeOperation}
                                    lineCap={'round'}
                                    lineJoin={'round'}
                                    points={item.points}
                                />
                                : item.type === 'text' ?
                                <TextComponent
                                    key={item.id}
                                    textProps={item}
                                    setIsTyping={setIsTyping}
                                    setHidingElement={setHidingElement}
                                    isSelected={item === selectedText}
                                    onChange={(newAttrs) => {
                                        const texts = canvasItems.slice();
                                        texts.splice(i, 1);
                                        const text = newAttrs;
                                        texts.push(text);
                                        setCanvasItems(texts);
                                    }}
                                />
                                :
                                <ImageComponent
                                    key={item.id}
                                    id={item.type}
                                    imgProps={item}
                                    isSelected={item.id === selectedId}
                                    onSelect={() => {
                                        selectImage(item.id);
                                        cancelSelectedText();
                                    }}
                                    onChange={(newAttrs) => {
                                        const images = canvasItems.slice();
                                        images.splice(i, 1);
                                        const image = newAttrs;
                                        images.push(image);
                                        setCanvasItems(images);
                                    }}
                                />
                        ))}
                    </Layer>
                </Stage>
                {isTyping &&
                    <textarea
                        value={selectedText.text}
                        onChange={(e) => {
                            setTextContent(e.target.value);
                            selectedText.text = e.target.value;
                        }}
                        className="absolute border-none p-0 m-0 overflow-hidden outline-none 
                                       resize-none leading-none origin-top-left"
                        ref={textAreaRef}
                        style={{
                            left: inputPosition.x + stageRef.current.attrs.container.offsetLeft,
                            top: inputPosition.y + stageRef.current.attrs.container.offsetTop,
                            width: selectedText.width,
                            height: 'auto',
                            fontSize: selectedText.fontSize + 'px',
                            background: 'none',
                            fontFamily: selectedText.fontFamily,
                            color: selectedText.color,
                            rotation: selectedText.rotation,
                            transform: `rotateZ(${selectedText.rotation}deg)translateY(-${0}px)`,
                        }}
                        onKeyDown={handleTextKeyDown}
                    />
                }
                {isBgColorSetting &&
                    <div id="" className="fixed"
                        style={{
                            top: stageRef.current.attrs.container.getBoundingClientRect().top + 650 - 200,
                            left: stageRef.current.attrs.container.getBoundingClientRect().left + 650 -200
                        }}>
                        <div className="flex justify-end m-0 p-0">
                            <HexColorPicker color={bgColor} onChange={setBgColor} />
                        </div>
                    </div>
                    }
                <Buttons />
            </div>
        </div >
    );
}

export default CanvasArea;