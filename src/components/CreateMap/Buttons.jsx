import React from "react";

const Buttons = ({imageComponents, setImageComponents}) => {
    const handleClearAll = () => {
        setImageComponents([]);
    }

    const handleSave = () => {
        console.log(imageComponents);
    }

    return (
        <div className="flex gap-4">
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 px-12 py-2 text-sm font-medium text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-sky-600"
                    href="/download"
                    onClick={handleClearAll}
                >
                    Clear All
                </button>
            </div>
            <div className="basis-1/2">
                <button
                    className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                    href="/download"
                    onClick={handleSave}
                >
                    Save Map
                </button>
            </div>
        </div>
    );
}

export default Buttons;