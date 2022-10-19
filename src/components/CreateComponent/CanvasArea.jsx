import React, { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import TextComponent from "./TextComponent";
import { Stage, Layer } from "react-konva";
import uuid from "react-uuid";
import { useAtom } from "jotai";
import { fontFamilyAtom, fontSizeAtom, inputPositionAtom, textColorAtom, textComponentsAtom } from "../../atoms/TextAtom";
import { detailActionAtom, userActionAtom } from "../../atoms/Atoms";

const CanvasArea = () => {
    const [userAction] = useAtom(userActionAtom);
    const [detailAction, setDetailAction] = useAtom(detailActionAtom);
    const [textComponents, setTextComponents] = useAtom(textComponentsAtom);
    const [inputPosition] = useAtom(inputPositionAtom);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedText, setSelectedText] = useState(null);
    const [, setTextContent] = useState(null);
    const [hidingElement, setHidingElement] = useState([]);
    const [color, setColor] = useAtom(textColorAtom);
    const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
    const [fontSize, setFontSize] = useAtom(fontSizeAtom);
    const stageRef = useRef();
    const textAreaRef = useRef();

    function removeSelectedText(){
        if(hidingElement){
            for(let ele of hidingElement){
                ele.show();
            }
        }
        setIsTyping(false);
        setSelectedText(null);
        setHidingElement([]);
    }

    const handleClick = (e) => {
        if(selectedText && stageRef.current == e.target){
            removeSelectedText();
        }
        if(userAction == 'Text' && detailAction == "addText"){
            let newTextComponent = {
                text: 'New Text',
                x: e.evt.clientX - stageRef.current.attrs.container.offsetLeft - 80,
                y: e.evt.clientY - stageRef.current.attrs.container.getBoundingClientRect().top - 10,
                width: 200,
                height: 30,
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: color,
                rotation: 0,
                id: uuid(),
            }
            setTextComponents([...textComponents, newTextComponent]);
            setDetailAction("");
        }
    }

   
    const handleTextKeyDown = (e) => {
        if(e.key == 'Enter' && !e.shiftKey){
            removeSelectedText();
        }
        if(e.key == 'Escape'){
            removeSelectedText();
        }
    }

    const deleteTextComponent = (e) => {
        if(e.key == "Backspace" && selectedText && !isTyping){
            setTextComponents(textComponents.filter(comp => comp.id != selectedText.id));
        }
    }

    useEffect(() => {
        if(isTyping){
            let end = textAreaRef.current.value.length;
            textAreaRef.current.setSelectionRange(end, end);
            textAreaRef.current.focus();
        }
        if(selectedText){
            setFontFamily(selectedText.fontFamily);
            setFontSize(selectedText.fontSize);
            setColor(selectedText.color);
        }
        window.addEventListener('keydown', deleteTextComponent)
        return () => {
            window.removeEventListener('keydown', deleteTextComponent);
        };
    },[isTyping, selectedText])

    useEffect(() => {
        if(selectedText){
            selectedText.fontFamily = fontFamily;
            removeSelectedText();
        }
    },[fontFamily])

    useEffect(() => {
        if(selectedText){
            selectedText.color = color;
        }
    },[color])

    useEffect(() => {
        if(selectedText){
            selectedText.fontSize = fontSize;
        }
    },[fontSize])
   

    return (
        <div>
            <div className="mx-auto" style={{ width: 650 }}>
                <div>
                    <Stage className="bg-white w-full mb-2 rounded drop-shadow relative overflow-hidden"
                        width={650} height={650}
                        ref={stageRef}
                        onClick={handleClick}
                    >
                        <Layer>
                            {textComponents.map(component => (
                                <TextComponent 
                                    key={component.id}
                                    textProps={component}
                                    setIsTyping={setIsTyping}
                                    setSelectedText={setSelectedText}
                                    setHidingElement={setHidingElement}
                                    isSelected={component == selectedText}
                                />
                            ))}
                        </Layer>
                    </Stage>
                    {isTyping &&
                        <textarea 
                            value={selectedText.text}
                            onChange={(e) =>{
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
                </div>
                <Buttons />
            </div>
        </div >
    );
}

export default CanvasArea;