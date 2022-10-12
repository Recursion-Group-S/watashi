import { useEffect, useState } from "react";

const CanvasComponent = ({component, maxZIndex, setMaxZIndex,
                        canvasComponents, setCanvasComponents}) => {

    const [move, setMove] = useState(false);
    const [startX, setStartX] = useState(component.x);
    const [startY, setStartY] = useState(component.y);
    const [isSelected, setIsSelected] = useState(false);
    const [zIndex, setZIndex] = useState(maxZIndex);

    const handleDragEnd = (e) => {
        // マウスがキャンバス外に出たらコンポーネントを削除
        e.preventDefault();
        let rightOver = e.clientX >= e.target.parentElement.getBoundingClientRect().right;
        let leftOver = e.clientX <= e.target.parentElement.getBoundingClientRect().left;
        let topOver = e.clientY <= e.target.parentElement.getBoundingClientRect().top;
        let bottomOver = e.clientY >= e.target.parentElement.getBoundingClientRect().bottom;
        if(rightOver || leftOver || topOver || bottomOver){
            setCanvasComponents(canvasComponents.filter(comp => comp.id !== component.id));
            return;
        }
        component.x += (e.clientX - startX);
        component.y += (e.clientY - startY);
        component.zIndex = maxZIndex;
        // setZIndex(maxZIndex + 1);
        setMove(!move);
    }

    const handleDragStart = (e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
        // 最新のドラッグされたコンポーネントが最前面にくる
        // setZIndex(maxZIndex + 1);
        setMaxZIndex(maxZIndex + 1);
    }

    const handleClick = (e) =>{
        e.preventDefault();
        setIsSelected(!isSelected);
    }
    

    return (
            // クリックして選択されたコンポーネントの拡大縮小が出来る
            <div className={`${isSelected ? "resize":""}
                            overflow-auto top-0 left-0 flex flex-col
                            content-center justify-between p-0 items-end`}
                style={{
                    top: component.y,
                    left: component.x,
                    position: 'absolute',
                    zIndex: component.zIndex,
                    backgroundColor: component.color,
                    height: 220,
                    width: 220,
                }}
                draggable
                onClick={handleClick}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDoubleClick={(e) =>{
                    console.log(e.target.style.zIndex);
                } }
            />
    );
}
 
export default CanvasComponent;