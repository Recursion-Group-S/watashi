import { useAtom } from "jotai"
import { canvasItemsAtom, stageRefAtom } from "./../atoms/ComponentAtom";
import Konva from "konva";

export const useSave = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);

    const saveComponent = (size) => {
        stageRef.current.children[0].children = [];
        for(let item of canvasItems) {
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
                imgObj.src = item.url;
                imgObj.crossOrigin = 'Anonymous';
                stageRef.current.children[0].add(new Konva.Image({
                    image: imgObj,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height,
                    rotation: item.rotation
                }))
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
        // let cx = stageRef.current.children[0].getContext('2d');
        // console.log(cx);
        // setTimeout(() => {
        //     let data = stageRef.current.toDataURL();
        //     // let data = stageRef.current.toDataURL({ left: size.left, top: size.top, width: size.width, height: size.height });
        //     console.log(data);
        //     setCanvasItems([]);
        //     stageRef.current.children[0].children = [];
        // }, 2000);

    }
    return { saveComponent }
}