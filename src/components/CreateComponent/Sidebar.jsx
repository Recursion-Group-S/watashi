import React from "react";
import { useState, useEffect } from "react";
import { UploadImage } from "./UploadImage";

import FlaticonWrapper from "../../apis/flaticon.js";

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.fetchIcons(searchTerm);
    };


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

const IconList = (props) => {
    const addIcon = (e) => {
        e.preventDefault();
        let x = e.clientX;
        let y = e.clientY;
        let icon = props.icons.find(icon => icon.id === parseInt(e.target.id));
        let iconComponent = {
            x: x,
            y: y,
            url: icon.images[256],
        }
        console.log(iconComponent);
    }
    const renderedItem = props.icons.map((icon) => {
        return (
            <div
                key={icon.id}
                className="w-1/4 p-1 cursor-pointer"
            >
                <img
                    src={icon.images[256]}
                    className="mx-auto"
                    id={icon.id}
                    draggable
                    onDragEnd={(e) => addIcon(e)}
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

const Sidebar = () => {
    const [userAction, setUserAction] = useState("addText");
    const [icons, setIcons] = useState([]);

    const fetchIcons = async (searchTerm) => {
        const flatIcon = new FlaticonWrapper();
        const token = await flatIcon.getToken();
        const icons = await flatIcon.searchIcons(token, searchTerm);

        setIcons(icons.data);
    };

  const chooseUserAction = (e) => {
    setUserAction(e.target.value);
  };

    const DisplaySidebarContent = () => {
        if (userAction === "addText") {
            return (
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-300">Select font-style</label>
                    <select className="mb-2bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                        <option>font1</option>
                        <option>font2</option>
                        <option>font3</option>
                    </select>
                </div>
            );
        } else if (userAction === "addIcon") {
            return (
                <div>
                    <SearchBar fetchIcons={fetchIcons} />
                    <IconList icons={icons} />
                </div>
            );
        } else if (userAction === "addImage") {
           return <UploadImage />;
        }
  };

    return (
        <div style={{ width: 444 }}>
            <a
                className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
                href="_temp"
                style={{ width: 444 }}
            >
                Back to CreateMap
            </a>
            <div className="p-6 overflow-y-scroll bg-white rounded drop-shadow" style={{ height: 650 }}>
                <div className="w-5/6 mx-auto mb-6">
                    <div className="flex justify-between">
                        <button onClick={chooseUserAction} value="addText">Text 💬</button>
                        <button onClick={chooseUserAction} value="addIcon">Icon 😄</button>
                        <button onClick={chooseUserAction} value="addImage">Image 🏞</button>
                    </div>
                </div>
                <DisplaySidebarContent />
            </div>
        </div >
    );
}

export default Sidebar;
