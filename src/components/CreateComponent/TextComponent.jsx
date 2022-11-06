import { useAtom } from "jotai";
import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";
import { userActionAtom } from "../../atoms/Atoms";
import { selectedIDAtom } from "../../atoms/ComponentAtom";
import { inputPositionAtom, selectedTextAtom } from "../../atoms/TextAtom";

const TextComponent = ({ textProps, setIsTyping, setHidingElement, isSelected, onChange }) => {
    const componentRef = useRef();
    const trRef = useRef();
    const [userAction] = useAtom(userActionAtom);
    const [, selectImage] = useAtom(selectedIDAtom);
    const [, setInputPosition] = useAtom(inputPositionAtom);
    const [, setSelectedText] = useAtom(selectedTextAtom);

    const handleDblClick = () => {
        setSelectedText(textProps);
        setHidingElement([componentRef.current, trRef.current]);
        componentRef.current.hide();
        trRef.current.hide();
        setIsTyping(true);
        let textPosition = componentRef.current.absolutePosition();
        setInputPosition({x: textPosition.x, y: textPosition.y});
    } 

    const handleDragEnd = () => {
        const node = componentRef.current;
        textProps.x = node.attrs.x;
        textProps.y = node.attrs.y;
        textProps.rotation = node.attrs.rotation;
        onChange(textProps);
    }

    const handleClick = () => {
        selectImage(null);
        setSelectedText(textProps)
    }

    const handleTransform = () => {
        const node = componentRef.current; 
        node.setAttrs({
            width: node.width() * node.scaleX(),
            scaleX: 1,
            rotation: node.rotation()
        });
        textProps.rotation = node.attrs.rotation;
        textProps.width = node.attrs.width;
        textProps.height = node.attrs.height;
        
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
                rotation={textProps.rotation}
                fontSize={textProps.fontSize}
                fontFamily={textProps.fontFamily}
                width={textProps.width}
                fontStyle={textProps.fontStyle}
                textDecoration={textProps.isUnderline ? 'underline' : ''}
                draggable={userAction === 'drawing' ? false : true}
                fill={textProps.color}
                onDblClick={handleDblClick}
                onDblTap={handleDblClick}
                onClick={handleClick}
                onTap={handleClick}
                onDragEnd={handleDragEnd}
                onTransform={handleTransform}
                onTransformEnd={() => {
                    const node = componentRef.current; 
                    onChange(
                    {
                        ...textProps,
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * node.scaleX()),
                        height: Math.max(node.height() * node.scaleY()),
                    })
                }}
                ref={componentRef}
            />
            {isSelected && 
                <Transformer
                    enabledAnchors={['middle-left', 'middle-right']}
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        newBox.width = Math.max(100, newBox.width);
                        return newBox;
                    }}
                />
            }
            
        </React.Fragment>
        
    );
}
 
export default TextComponent;