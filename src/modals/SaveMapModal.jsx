import React, { useState } from "react";
import { useAtom } from "jotai";
import { modalDispStatusAtom } from "../atoms/ComponentAtom";
import { currentMapAtom } from "../atoms/CurrentMapAtom";
import { useSave } from "../hooks/useSave";

const SaveMapModal = () => {
    const [modalDisplay, setModalDisplay] = useAtom(modalDispStatusAtom);
    const [currentMap, setCurrentMap] = useAtom(currentMapAtom);
    const [mapTitle, setMapTitle] = useState(currentMap.mapTitle);
    const { saveMap } = useSave();

    const hideModal = () => {
        setModalDisplay("hidden");
    }

    const onInputChange = (e) => {
        setMapTitle(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const editingCurrentMap = currentMap;
        editingCurrentMap.mapTitle = mapTitle;
        setCurrentMap(editingCurrentMap);
        hideModal();
        saveMap();
    }

    return (
        <div id="model-wrapper" className={`${modalDisplay} h-screen w-screen bg-slate-700/50 fixed left-0 top-0 flex justify-center items-center`}>
            <div id="save-map-modal" tabindex="-1" aria-hidden="true"
                className="w-1/3"
            >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-2xl shadow">
                        <button
                            onClick={hideModal}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="authentication-modal">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Save your work</h3>
                            <form onSubmit={onFormSubmit} className="space-y-6" action="#">
                                <div>
                                    <label for="map-name" className="block mb-1 text-sm font-medium text-gray-300">Input name of your work</label>
                                    <input
                                        type="text"
                                        name="map-name"
                                        onChange={onInputChange}
                                        value={mapTitle}
                                        min="1"
                                        max="30"
                                        id="map-name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
                                        placeholder="My awesome map"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full text-center inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SaveMapModal;