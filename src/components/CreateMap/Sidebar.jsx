import React, { useState } from "react";

// サイドバーにあるコンポーネント。urlを持っていてほしい
const sideComponentImages = [
    {
        id: 1,
        name: 'face',
        url: 'https://media.istockphoto.com/photos/smiley-face-drawing-picture-id157527255?k=20&m=157527255&s=612x612&w=0&h=crmQMqmwdlQUhAVF6V5Y4E_O3RL4qvTsTZIgKPAXf-Y=',
    },
    {
        id: 2,
        name: 'hand',
        url: 'https://coloringcool.com/wp-content/data/images/2022/08/Hand-Drawing-4.jpg',
    },
    {
        id: 3,
        name: 'tree',
        url: 'data:image/png;base64,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',
    },
    {
        id: 4,
        name: 'cloud',
        url: 'https://i.pinimg.com/736x/4f/a7/10/4fa710d29ac114f7db42be72d10edc1b.jpg',
    },
    {
        id: 5,
        name: 'house',
        url: 'https://previews.123rf.com/images/zdeneksasek/zdeneksasek1812/zdeneksasek181200059/112929678-black-brush-and-ink-artistic-rough-hand-drawing-of-small-stand-alone-single-family-house-with-tree-.jpg',
    }
]

const Sidebar = ({addComponent}) => {
    const [sideComponents, setSideComponents] = useState(sideComponentImages);
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);

    const handleDragEnd = (e) =>{
        e.preventDefault();
        //コンポーネントのどの位置を持ったかでのズレを調整
        let x = e.clientX - shiftX;
        let y = e.clientY - shiftY;
        let item = sideComponents.find(component => component.id === parseInt(e.target.id));
        item.x = x;
        item.y = y;
        // キャンバス内にあるコンポーネントの配列に追加する
        addComponent(e, item);
    }

    const handleDragStart = (e) => {
        setShiftX(e.clientX - e.target.getBoundingClientRect().left);
        setShiftY(e.clientY - e.target.getBoundingClientRect().top);
    }

    return (
        <div>
            <a
                className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href="/createComponent"
            >
                + Create New Component
            </a>
            <div className="grid grid-cols-2 gap-1 overflow-y-scroll" style={{ height: 650 }}>
                {sideComponents.map(component => 
                    <div key={component.id}
                        draggable={false}
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                        className="rounded bg-white drop-shadow"
                        style={{ 
                            height: 220,
                            width: 220,
                        }}>
                            <img id={component.id} src={component.url}></img>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Sidebar;