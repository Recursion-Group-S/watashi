import { useAtom } from "jotai";
import { fontFamilyAtom, fontSizeAtom, textColorAtom } from "../atoms/TextAtom";
import uuid from "react-uuid";

export const useText = () => {
    const [fontSize] = useAtom(fontSizeAtom);
    const [fontFamily] = useAtom(fontFamilyAtom);
    const [color] = useAtom(textColorAtom);
    
    const addCanvasText = (e, parentRef, target, setTarget) => {
        let newTextComponent = {
            type: 'Text',
            text: 'New Text',
            x: e.evt.clientX - parentRef.current.attrs.container.offsetLeft - 80,
            y: e.evt.clientY - parentRef.current.attrs.container.getBoundingClientRect().top - 10,
            width: 200,
            height: 30,
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color,
            rotation: 0,
            id: uuid(),
        }
        setTarget([...target, newTextComponent]);
    }

    return { addCanvasText };
}