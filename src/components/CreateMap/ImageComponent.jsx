import React, { useEffect, useRef } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const ImageComponent = ({imgProps, isSelected, onSelect, onChange }) => {
    const [image] = useImage(imgProps.url);
    const componentRef = useRef();
    const trRef = useRef();
  
    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([componentRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
  
    return (
    <React.Fragment>
        <Image
            image={image}
            onClick={onSelect}
            onTap={onSelect}
            ref={componentRef}
            {...imgProps}
            draggable
            rotation={imgProps.rotation}
            onDragEnd={(e) => {
                onChange({
                    ...imgProps,
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onTransformEnd={(e) => {
                imgProps.rotation = e.target.attrs.rotation;
                const node = componentRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                ...imgProps,
                x: node.x(),
                y: node.y(),
                rotation: imgProps.rotation,
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
                });
            }}
        />
        {isSelected && (
            <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                }
                return newBox;
                }}
            />
        )}
    </React.Fragment>
    )
}
 
export default ImageComponent;

