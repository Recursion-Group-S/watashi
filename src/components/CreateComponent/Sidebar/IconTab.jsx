import React, { useEffect } from "react";
import { useState } from "react";

import { canvasRefAtom } from "../../../atoms/ComponentAtom";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { iconsAtom } from "../../../atoms/IconAtom";
import { searchTermAtom } from "../../../atoms/IconAtom";
import { useNewItem } from "../../../hooks/useNewItem";

import FlaticonWrapper from "../../../apis/flaticon.js";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const setIcons = useSetAtom(iconsAtom);

    const fetchIcons = async (searchTerm) => {
        const flatIcon = new FlaticonWrapper();
        const token = await flatIcon.getToken();
        const fetchedIcons = await flatIcon.searchIcons(token, searchTerm);

        setIcons(fetchedIcons.data);
    };

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        fetchIcons(searchTerm);
    };

    // レンダリング時にデフォルトIcon取得
    useEffect(() => {
        fetchIcons(searchTerm);
    }, []);

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <label className="block mb-1 text-sm font-medium text-gray-300">Search icons</label>
                <input
                    type="text"
                    className="mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                    value={searchTerm}
                    onChange={onInputChange}
                >
                </input>
            </form>
        </>
    );
}

const IconList = () => {
    const [canvasAtom] = useAtom(canvasRefAtom);
    const { isValidDrop, addItem } = useNewItem();
    const [shift, setShift] = useState({ x: 0, y: 0 });
    const icons = useAtomValue(iconsAtom);

    const handleShift = (e) => {
        setShift({
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top
        })
    }

    const addIcon = (e) => {
        e.preventDefault();
        if (!isValidDrop(e, canvasAtom)) {
            return;
        }

        let icon = icons.find(icon => icon.id === parseInt(e.target.id));
        let newIcon = {
            x: e.clientX - shift.x,
            y: e.clientY - shift.y,
            url: icon.images[256],
            type: 'icon'
        }
        addItem(newIcon, canvasAtom);
    }

    const renderedItem = icons.map((icon) => {
        return (
            <div
                key={icon.id}
                className="w-1/4 p-1 cursor-pointer"
            >
                <img
                    alt={icon.name}
                    src={icon.images[256]}
                    className="mx-auto"
                    id={icon.id}
                    draggable
                    onDragEnd={addIcon}
                    onDragStart={handleShift}
                />
            </div>
        )
    });

    return (
        <div
            className="border rounded-lg p-3 overflow-y-scroll"
            style={{ height: 480 }}
        >
            <div className="flex flex-wrap">
                {renderedItem}
            </div >
        </div>
    );
};

const IconTab = () => {
    return (
        <div className="bg-white px-8 pt-2 pb-4 rounded-xl">
            <SearchBar />
            <IconList />
        </div>
    );
};

export default IconTab;