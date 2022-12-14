import { useAtom } from "jotai";
import uuid from "react-uuid";
import { canvasItemsAtom } from "../atoms/ComponentAtom";
import { imageComponentsAtom } from "../atoms/MapAtom";
import { useSave } from "./useSave";


export const useNewItem = () => {
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    const [imageComponents, setImageComponents] = useAtom(imageComponentsAtom);


    const isValidDrop = (e, parentRef) => {
        let topOver = e.clientY < parentRef.current.getBoundingClientRect().top;
        let leftOver = e.clientX < parentRef.current.getBoundingClientRect().left;
        let bottomOver = e.clientY > parentRef.current.getBoundingClientRect().bottom;
        let rightOver = e.clientX > parentRef.current.getBoundingClientRect().right;
        return !topOver && !leftOver && !bottomOver && !rightOver
    }

    const addItem = (item, parentRef) => {
        let newItem = {
            id: uuid(),
            type: item.type,
            x: item.x - parentRef.current.getBoundingClientRect().left,
            y: item.y - parentRef.current.getBoundingClientRect().top,
            width: 100,
            height: 100,
            rotation: 0,
            url: item.url,
            text: null,
            fontSize: null,
            fontFamily: null,
            color: null,
            fontStyle: null,
            isUnderline: null,
            globalCompositeOperation: null,
            points: null
        }
        setCanvasItems([...canvasItems, newItem]);
    }

    const addComponent = (item, parentRef) => {
        let newItem = {
            x: item.x - parentRef.current.getBoundingClientRect().left,
            y: item.y - parentRef.current.getBoundingClientRect().top,
            width: 220,
            height: 220,
            rotation: 0,
            url: item.url,
            id: uuid(),
        };
        setImageComponents([...imageComponents, newItem]);
    }

    return { isValidDrop, addItem, addComponent }
}