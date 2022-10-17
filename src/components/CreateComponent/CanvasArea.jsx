import React, { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import TextComponent from "./TextComponent";
import { Stage, Layer } from "react-konva";
import uuid from "react-uuid";

const CanvasArea = ({ userAction, setUserAction, detailAction, setDetailAction, fontFamily, setFontFamily }) => {
    const [textComponents, setTextComponents] = useState([]);
    const [inputPosition, setInputPosition] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedText, setSelectedText] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [hidingElement, setHidingElement] = useState([]);
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
            if(textContent) selectedText.text = textContent;
            removeSelectedText();
        }
        if(userAction == 'Text' && detailAction == "addText"){
            let newTextComponent = {
                text: 'New Text',
                x: e.evt.clientX - stageRef.current.attrs.container.offsetLeft - 80,
                y: e.evt.clientY - stageRef.current.attrs.container.getBoundingClientRect().top - 10,
                width: 200,
                height: 30,
                fontSize: 30,
                fontFamily: fontFamily,
                color: 'black',
                rotation: 0,
                id: uuid(),
            }
            setTextComponents([...textComponents, newTextComponent]);
            setDetailAction("");
        }
    }

   
    const handleTextKeyDown = (e) => {
        if(e.key == 'Enter' && !e.shiftKey){
            selectedText.text = textContent;
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
                                    setInputPosition={setInputPosition}
                                    setIsTyping={setIsTyping}
                                    setSelectedText={setSelectedText}
                                    setTextContent={setTextContent}
                                    setHidingElement={setHidingElement}
                                    isSelected={component == selectedText}
                                />
                            ))}
                        </Layer>
                    </Stage>
                    {isTyping &&
                        <textarea 
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="absolute border-none p-0 m-0 overflow-hidden outline-none 
                                       resize-none leading-none origin-top-left"
                            ref={textAreaRef}
                            style={{
                                left: inputPosition.x + stageRef.current.attrs.container.offsetLeft,
                                top: inputPosition.y + stageRef.current.attrs.container.offsetTop,
                                width: selectedText.width,
                                height: selectedText.height,
                                fontSize: selectedText.fontSize,
                                background: 'none',
                                fontFamily: selectedText.fontFamily,
                                color: selectedText.color,
                                rotation: selectedText.rotation,
                                transform: `rotateZ(${selectedText.rotation}deg)`,
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