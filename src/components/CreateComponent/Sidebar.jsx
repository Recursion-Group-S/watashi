import React from "react";
import { useState, useEffect } from "react";
import { UploadImage } from "./UploadImage";

const Sidebar = () => {
  const [userAction, setUserAction] = useState("addText");

  const chooseUserAction = (e) => {
    setUserAction(e.target.value);
  };

  const DisplaySidebarContent = () => {
    if (userAction === "addText") {
      console.log(userAction);
      return (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Select font-style
          </label>
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
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Search icons
          </label>
          <input
            type="text"
            className="mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
            placeholder="Icon name"
          ></input>

          <div className="flex flex-wrap border rounded-lg p-2">
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🐤</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
            <div className="w-1/6 text-center p-2 cursor-pointer">🦖</div>
          </div>
        </div>
      );
    } else if (userAction === "addImage") {
      return <UploadImage />;
    }
  };

  return (
    <div>
      <a
        className="w-full text-center inline-block rounded border border-sky-600 bg-sky-600 px-12 py-2 mb-2 text-sm font-medium text-white hover:bg-white hover:text-sky-600 focus:outline-none focus:ring active:text-sky-600"
        href="_temp"
        style={{ width: 444 }}
      >
        Back to CreateMap
      </a>
      <div
        className="p-6 overflow-y-scroll bg-white rounded drop-shadow"
        style={{ height: 650 }}
      >
        <div className="w-5/6 mx-auto mb-6">
          <div className="flex justify-between">
            <button onClick={chooseUserAction} value="addText">
              Text 💬
            </button>
            <button onClick={chooseUserAction} value="addIcon">
              Icon 😄
            </button>
            <button onClick={chooseUserAction} value="addImage">
              Image 🏞
            </button>
          </div>
        </div>
        <DisplaySidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
