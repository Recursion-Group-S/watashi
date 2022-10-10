import React, { useState } from "react";;

const Sidebar = ({addComponent}) => {
    // キャンバス内外関わらず、ユーザーによって作成されたコンポーネント(サイドバーに表示される)
    const [sideComponents, setSideComponents] = useState(['orange', 'red', 'green', 'blue', 'pink'])

    const handleDragEnd = (e) =>{
        e.preventDefault();
        addComponent(e, e.target.innerHTML);
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