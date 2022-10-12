import React, { useState } from "react";;

const Sidebar = ({addComponent}) => {
    // キャンバス内外関わらず、ユーザーによって作成されたコンポーネント(サイドバーに表示される)
    const [sideComponents, setSideComponents] = useState(['orange', 'red', 'green', 'blue', 'pink']);
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);

    const handleDragEnd = (e) =>{
        e.preventDefault();
        let x = e.clientX - shiftX;
        let y = e.clientY - shiftY;
        console.log(e.target.parentElement);
        addComponent(e, x, y, e.target.innerHTML);
    }

    const handleDragStart = (e) => {
        setShiftX(e.clientX - e.target.getBoundingClientRect().left);
        setShiftY(e.clientY - e.target.getBoundingClientRect().top);
    }

    return (
        <div>
            <a
                className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href=""
            >
                + Create New Component
            </a>
            <div className="grid grid-cols-2 gap-1 overflow-y-scroll" style={{ height: 650 }}>
                
                {sideComponents.map(component => 
                    <div key={component}
                        draggable
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                        className="rounded bg-white drop-shadow"
                        style={{ height: 220,
                                width: 220,
                                backgroundColor: component,
                            }}>{component}</div>
                )}
            </div>
        </div >
    );
}

export default Sidebar;