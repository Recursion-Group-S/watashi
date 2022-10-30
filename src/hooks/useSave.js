import { useAtom, useAtomValue } from "jotai"
import { backgroundImageAtom, canvasItemsAtom, stageRefAtom } from "./../atoms/ComponentAtom";
import { currentMapAtom } from "../atoms/CurrentMapAtom";
import Konva from "konva";
import { postMap } from "../db/map";

export const useSave = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);
    const currentMap = useAtomValue(currentMapAtom)
    const backgroundImage = useAtomValue(backgroundImageAtom)

    const addItemOnCanvas = (item) => {
        if(item.type === 'line'){
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
        else if(item.type === 'icon' || item.type === 'image') {
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
        else if(item.type === 'text') {
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

    const setBackground = () => {
        stageRef.current.children[0].add(new Konva.Rect({
            x: 0,
            y: 0,
            width: 650,
            height: 650,
            fill: currentMap.backgroundColor,
        }))
        let imgObj = new Image();
            
        imgObj.onload = function(){
            stageRef.current.children[0].add(new Konva.Image({
                image: imgObj,
                x: 0,
                y: 0,
                width: 650,
                height: 650,
            }))
            for(let item of canvasItems) {
                addItemOnCanvas(item);   
            }
        }
        imgObj.crossOrigin = "Anonymous";
        imgObj.src = backgroundImage.src;
    }

    const saveMap = () => {
        // 画像urlを取得してdatabaseのMapを新規追加/書き換え
        // 非同期で画像が前に来てしまう
        stageRef.current.children[0].children = [];
        setBackground();
        
        setTimeout(() => {
            let data = stageRef.current.toDataURL();
            updateMap(data);
            setCanvasItems([]);
            stageRef.current.children[0].children = [];
        }, 3000);
    }


    const updateMap = (mapUrl) => {
        const newMap = 
        {
            mapID: currentMap.mapID,
            mapTitle: currentMap.mapTitle,
            author: currentMap.author,
            url: mapUrl,
            mapItems: canvasItems,
            backgroundColor: currentMap.backgroundColor,
            createdAt: currentMap.createdAt
        }
        postMap(newMap);
    }
    return { saveMap }
}