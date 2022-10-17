import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

const TextComponent = ({ textProps, setInputPosition, setIsTyping, setSelectedText, setTextContent, setHidingElement, isSelected }) => {
    const componentRef = useRef();
    const trRef = useRef();

    const handleDblClick = () => {
        setSelectedText(textProps);
        setTextContent(textProps.text);
        setHidingElement([componentRef.current, trRef.current]);
        componentRef.current.hide();
        trRef.current.hide();
        setIsTyping(true);
        let textPosition = componentRef.current.absolutePosition();
        setInputPosition({x: textPosition.x, y: textPosition.y});
    } 

    useEffect(() => {
        if(isSelected){
            trRef.current.nodes([componentRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                text={textProps.text}
                x={textProps.x}
                y={textProps.y}
                fontSize={30}
                fontFamily={textProps.fontFamily}
                width={200}
                draggable
                onDblClick={handleDblClick}
                onDblTap={handleDblClick}
                onClick={() => setSelectedText(textProps)}
                onTap={() => setSelectedText(textProps)}
                onDragEnd={(e) => {
                    const node = componentRef.current;
                    textProps.x = node.attrs.x;
                    textProps.y = node.attrs.y;
                }}
                onTransform={(e) =>{
                    const node = componentRef.current;
                    node.attrs.width = node.width() * node.scaleX();
                    node.scaleX(1);
                    textProps.rotation = node.attrs.rotation;
                    textProps.width = node.attrs.width;
                    textProps.height = node.attrs.height;
                }}
                ref={componentRef}
            />
            {isSelected && 
                <Transformer
                    enabledAnchors= {['middle-left', 'middle-right']}
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        newBox.width = Math.max(30, newBox.width);
                        return newBox;
                    }}
                />
            }
            
        </React.Fragment>
        
    );
}
 
export default TextComponent;