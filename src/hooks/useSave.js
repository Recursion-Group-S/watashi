import { useAtom, useAtomValue } from "jotai"
import { backgroundImageAtom, canvasItemsAtom, stageRefAtom } from "./../atoms/ComponentAtom";
import { currentMapAtom } from "../atoms/CurrentMapAtom";
import { postMap } from "../db/map";
import { useNavigate } from "react-router-dom";

export const useSave = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [stageRef] = useAtom(stageRefAtom);
    const currentMap = useAtomValue(currentMapAtom)
    const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom)
    const navigate = useNavigate();

    const saveMap = () => {
        let data = stageRef.current.toDataURL();
        updateMap(data);
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
            backgroundImage: backgroundImage.src,
            createdAt: currentMap.createdAt
        }
        postMap(newMap).then(() => navigate('/gallery'))
        setBackgroundImage(new Image());
    }
    return { saveMap }
}