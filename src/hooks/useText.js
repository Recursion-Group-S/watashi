import { useAtom } from "jotai";
import uuid from "react-uuid";
import { fontSizeAtom, textComponentsAtom } from "../atoms/TextAtom";

export default function useText(e, stageRef) {
    const [fontSize] = useAtom(fontSizeAtom);
    const [textComponents, setTextComponents] = useAtom(textComponentsAtom);
    
    let newTextComponent = {
        type: 'Text',
        text: 'New Text',
        x: e.evt.clientX - stageRef.current.attrs.container.offsetLeft - 80,
        y: e.evt.clientY - stageRef.current.attrs.container.getBoundingClientRect().top - 10,
        width: 200,
        height: 30,
        fontSize: fontSize,
        // fontFamily: fontFamily,
        // color: color,
        rotation: 0,
        id: uuid(),
    }
    console.log("this");
    setTextComponents([...textComponents, newTextComponent]);
    return {};
}