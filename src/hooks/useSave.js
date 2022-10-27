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
        stageRef.current.children[0].children = [];
        for(let item of canvasItems) {
            addItemOnCanvas(item);   
        }
        
        setTimeout(() => {
            let data = stageRef.current.toDataURL();
            setCanvasItems([]);
            stageRef.current.children[0].children = [];
            console.log(data);
        }, 2000);
        
    }
    return { saveComponent }
}