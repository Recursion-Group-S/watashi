import { useAtom } from "jotai";
import { fontFamilyAtom, fontSizeAtom, textColorAtom, textComponentsAtom } from "../atoms/TextAtom";
import uuid from "react-uuid";

export const useText = () => {
    const [fontSize] = useAtom(fontSizeAtom);
    const [fontFamily] = useAtom(fontFamilyAtom);
    const [color] = useAtom(textColorAtom);
    const [textComponents, setTextComponents] = useAtom(textComponentsAtom)
    
    const addCanvasText = () => {
        let randomX = Math.random() * 150 - 75;
        let randomY = Math.random() * 150 - 75;
        let newTextComponent = {
            type: 'Text',
            text: 'New Text',
            x: 250 + randomX,
            y: 300 + randomY,
            width: 200,
            height: 30,
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color,
            rotation: 0,
            id: uuid(),
        }
        setTextComponents([...textComponents, newTextComponent]);
    }

    return { addCanvasText };
}