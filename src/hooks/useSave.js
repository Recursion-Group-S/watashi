import { useAtom } from "jotai"
import { canvasItemsAtom, stageRefAtom } from "./../atoms/ComponentAtom";
import Konva from "konva";

export const useSave = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);

    const addItemOnCanvas = (item) => {
        if(item.type == 'line'){
            stageRef.current.children[0].add(new Konva.Line({
                key: item.id,
                id: item.type,
                stroke: item.color,
                strokeWidth: item.width,
                globalCompositeOperation: item.globalCompositeOperation,
                lineCap: "round",
                lineJoin: "round",
                points: item.points,
            }))
        }
        else if(item.type == 'icon' || item.type == 'image') {
            let imgObj = new Image();
            
            imgObj.onload = function(){
                stageRef.current.children[0].add(new Konva.Image({
                    image: imgObj,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height,
                    rotation: item.rotation
                }))
            }
            imgObj.crossOrigin = "Anonymous";
            imgObj.src = item.url;
            
        }
        else if(item.type == 'text') {
            stageRef.current.children[0].add(new Konva.Text({
                text: item.text,
                x: item.x,
                y: item.y,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                width: item.width,
                fontStyle: item.fontStyle,
                textDecoration: item.isUnderline ? 'underline' : '',
                fill: item.color,
            }))
        }
    }

    const saveComponent = () => {
        let componentSize = { left: 650, right: 0, top: 650, bottom: 0 };
        stageRef.current.children[0].children = [];
        for(let item of canvasItems) {
            addItemOnCanvas(item);
            if(item.type != 'line'){
                componentSize = {
                    left: Math.min(componentSize.left, item.x),
                    right: Math.max(componentSize.right, item.x + item.width),
                    top: Math.min(componentSize.top, item.y),
                    bottom: Math.max(componentSize.bottom, item.y + item.height),
                }
            }
            
        }
    
        // let data = stageRef.current.toDataURL();
        // setCanvasItems([]);
        // stageRef.current.children[0].children = [];
        // console.log(data);
        // console.log(componentSize);
        console.log(stageRef.current)
   
        
    }
    return { saveComponent }
}