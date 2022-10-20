import uuid from "react-uuid";

export const useNewItem = () => {
    const isValidDrop = (e, parentRef) => {
        let topOver = e.clientY < parentRef.current.getBoundingClientRect().top;
        let leftOver = e.clientX < parentRef.current.getBoundingClientRect().left;
        let bottomOver = e.clientY > parentRef.current.getBoundingClientRect().bottom;
        let rightOver = e.clientX > parentRef.current.getBoundingClientRect().right;
        return !topOver && !leftOver && !bottomOver && !rightOver
    }

    const createAddItem = (item, parentRef, target, setTarget) => {
        let newItem = {
            x: item.x - parentRef.current.getBoundingClientRect().left,
            y: item.y - parentRef.current.getBoundingClientRect().top,
            width: 220,
            height: 220,
            rotation: 0,
            url: item.url,
            id: uuid(),
        };
        setTarget([...target, newItem]);
    }

    return { isValidDrop, createAddItem }
}