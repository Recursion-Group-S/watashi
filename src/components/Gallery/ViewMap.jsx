import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { currentMapAtom } from "../../atoms/CurrentMapAtom";
import { modalDispStatusAtom } from "../../atoms/GalleryAtom";

const ViewMap = () => {
    const currentMap = useAtomValue(currentMapAtom);
    const [modalDispStatus, setModalDispStatus] = useAtom(modalDispStatusAtom);
    console.log(currentMap);

    const closeModal = (e) => {
        setModalDispStatus("hidden");
    }

    // Modalの外側をクリックした時にModalを閉じる
    const handleClickOutsideOfModal = (e) => {
        if (!e.target.closest('#modal')) {
            closeModal();
        }
    }

    // 閉じるボタンをクリックした時にModalを閉じる
    const handleClickCloseButton = () => {
        closeModal();
    }

    if (!currentMap) return <></>;
    return (
        <>
            <div
                onClick={handleClickOutsideOfModal}
                className={`${modalDispStatus} bg-slate-900/70 h-screen w-screen fixed top-0 left-0 flex justify-center items-center`}>
                <div>
                    <div id="modal" className="rounded relative" style={{ width: 650, height: 650 }}>
                        <div>
                            <button
                                onClick={handleClickCloseButton}
                                className="text-white flex justify-center items-center bg-slate-700/50 rounded-full w-9 h-9 absolute top-3 right-3">&#10005;</button>
                        </div>
                        <img className="rounded" src={currentMap.url} alt={currentMap.mapTitle} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewMap;