import { useState } from "react";

const CanvasComponent = ({component, maxZIndex, setMaxZIndex, canvasComponents, setCanvasComponents}) => {
    const [left, setLeft] = useState(component.x);
    const [top, setTop] = useState(component.y);
    const [startX, setStartX] = useState(component.x);
    const [startY, setStartY] = useState(component.y);
    const [isSelected, setIsSelected] = useState(false);
    const [zIndex, setZIndex] = useState(maxZIndex);

    const handleDragEnd = (e) => {
        // マウスがキャンバス外に出たらコンポーネントを削除
        e.preventDefault();
        let rightOver = e.clientX >= e.target.parentElement.getBoundingClientRect().right;
        let leftOver = e.clientX <= 0;
        let topOver = e.clientY <= e.target.parentElement.getBoundingClientRect().top;
        let bottomOver = e.clientY >= e.target.parentElement.getBoundingClientRect().bottom;
        if(rightOver || leftOver || topOver || bottomOver){
            setCanvasComponents(canvasComponents.filter(comp => comp.id !== component.id));
            return;
        }
        setLeft(left + (e.clientX - startX) );
        setTop(top + (e.clientY - startY) );
        setZIndex(maxZIndex);
    }

    const handleDragStart = (e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
        // 最新のドラッグされたコンポーネントが最前面にくる
        setMaxZIndex(maxZIndex + 1);
    }

    const handleClick = (e) =>{
        e.preventDefault();
        setIsSelected(!isSelected)
    }


    return (
            // クリックして選択されたコンポーネントの拡大縮小が出来る
            <div className={`${isSelected ? "resize":""}
                            overflow-auto h-36 w-36 top-0 left-0 flex flex-col
                            content-center justify-between p-0 items-end `}
                style={{
                    top: top,
                    left: left,
                    position: 'absolute',
                    zIndex: zIndex,
                    backgroundColor: component.color,
                }}
                draggable
                onClick={handleClick}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                // onMouseDown={(e) => e.target.style.cursor = '!grabbing'}
            />
    );
}
 
export default CanvasComponent;