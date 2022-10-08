import React from "react";;

const Sidebar = () => {
    return (
        <div>
            <a
                class="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href=""
            >
                + Create New Component
            </a>
            <div className="grid grid-cols-2 gap-1 overflow-y-scroll" style={{ height: 650 }}>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
                <div className="rounded bg-white drop-shadow" style={{ height: 200 }}></div>
            </div>
        </div >
    );
}

export default Sidebar;