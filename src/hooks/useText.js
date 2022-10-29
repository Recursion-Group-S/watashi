import { useAtom } from "jotai";
import { fontFamilyAtom, fontSizeAtom, fontStyleAtom, isUnderlineAtom, textColorAtom, textComponentsAtom } from "../atoms/TextAtom";
import uuid from "react-uuid";
import { canvasItemsAtom } from "../atoms/ComponentAtom";

export const useText = () => {
    const [fontSize] = useAtom(fontSizeAtom);
    const [fontFamily] = useAtom(fontFamilyAtom);
    const [color] = useAtom(textColorAtom);
    const [fontStyle] = useAtom(fontStyleAtom);
    const [isUnderline] = useAtom(isUnderlineAtom);
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);
    
    const addCanvasText = () => {
        let randomX = Math.random() * 150 - 75;
        let randomY = Math.random() * 150 - 75;
        let newText = {
            id: uuid(),
            type: 'text',
            x: 250 + randomX,
            y: 300 + randomY,
            width: 200,
            height: 30,
            rotation: 0,
            url: null,
            text: 'New Text',
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color,
            fontStyle: fontStyle,
            isUnderline: isUnderline,
            globalCompositeOperation: null,
            points: null
        }
        setCanvasItems([...canvasItems, newText]);
    }

    return { addCanvasText };
}