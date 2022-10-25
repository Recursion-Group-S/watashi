import { useAtom } from "jotai";
import { canvasItemsAtom, isPaintAtom, paintColorAtom, paintModeAtom, paintWidthAtom } from "../atoms/ComponentAtom";
import uuid from "react-uuid";

export const useDrawing = () => {
    const [isPaint, setIsPaint] = useAtom(isPaintAtom)
    const [paintMode] = useAtom(paintModeAtom);
    const [paintWidth] = useAtom(paintWidthAtom);
    const [paintColor] = useAtom(paintColorAtom);
    const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);

    const startDrawing = (stageRef) => {
        setIsPaint(true);
        let position = stageRef.current.getPointerPosition();
        let newLine = {
            id: uuid(),
            type: 'line',
            stroke: paintColor,
            strokeWidth: paintWidth,
            globalCompositeOperation:
                paintMode === 'brush' ? 'source-over' : 'destination-out',
            lineCap: 'round',
            lineJoin: 'round',
            // add point twice, so we have some drawings even on a simple click
            points: [position.x, position.y, position.x, position.y],
        };
        setCanvasItems([...canvasItems, newLine]);
    }

    const endDrawing = () => {
        setIsPaint(false);
    }

    const moveDrawing = (e, stageRef, lines) => {
        if (!isPaint) {
            return;
        }
  
        // prevent scrolling on touch devices
        e.evt.preventDefault();
        const position = stageRef.current.getPointerPosition();
        const lastLineRef = lines[lines.length - 1];
        var newPoints = lastLineRef.points().concat([position.x, position.y]);
        lastLineRef.points(newPoints);
        let lineItems = canvasItems.filter(item => item.type == 'line');
        const lastLine = lineItems[lineItems.length - 1];
        lastLine.points = lastLineRef.points();
    }

    return { startDrawing, endDrawing, moveDrawing }
}