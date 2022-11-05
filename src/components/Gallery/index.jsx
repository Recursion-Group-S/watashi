import { useAtom, useAtomValue } from "jotai";
import { React, useEffect, useState } from "react";
import { getMaps } from "../../db/map";
import MapList from "./MapList";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import {
  currentMapAtom,
  currentPageAtom,
  mapListAtom,
} from "../../atoms/CurrentMapAtom";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import uuid from "react-uuid";
import { useAuthUser } from "../../hooks/useAuthUser";
import ReactLoading from "react-loading";
import ViewMap from "./ViewMap";

const Gallery = () => {
  const userAuth = useAuthUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setCanvasItems = useSetAtom(canvasItemsAtom);
  const setCurrentMap = useSetAtom(currentMapAtom);
  const [mapList, setMapList] = useAtom(mapListAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [galleryType, setGalleryType] = useState("authUser");

  const handleNewMap = () => {
    const newMap = {
      mapID: uuid(),
      mapTitle: "",
      author: userAuth.uid,
      url: "",
      mapItems: [],
      backgroundColor: "white",
      createdAt: Date(),
    };

    navigate(`/map/${newMap.mapID}`);
    setCurrentMap(newMap);
    setCanvasItems(newMap.mapItems);
  };

  const getUserMaps = () => {
    if (userAuth) {
      setLoading(true)
      getMaps(userAuth.uid, "authUser")
        .then((res) => {
          setMapList(res);
          setGalleryType("authUser");
          setCurrentPage(1);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });;
    }
  };

  const getFriendsMaps = () => {
    if (userAuth) {
      setLoading(true)
      getMaps(userAuth.uid, "friends")
        .then((res) => {
          setMapList(res);
          setGalleryType("friends");
          setCurrentPage(1);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getUserMaps();
  }, [userAuth, setMapList]);

  return (
    <div className="w-screen">
      <div className="mx-auto mb-6 flex" style={{ width: 1048 }}>
        <div
          className={`basis-1/2 m-0 text-center text-xl cursor-pointer ${
            galleryType === "authUser" ? "font-bold" : ""
          }`}
          onClick={() => getUserMaps()}
        >
          My Gallery
        </div>
        <span>|</span>
        <div
          className={`basis-1/2 m-0 text-center text-xl cursor-pointer ${
            galleryType === "friends" ? "font-bold" : ""
          }`}
          onClick={() => getFriendsMaps()}
        >
          Friends' Gallery
        </div>
      </div>
      <div
        className="mx-auto flex flex-wrap gap-4 mb-2"
        style={{ width: 1048 }}
      >
        {loading ? (
          <div className="flex justify-center w-screen my-10">
            <ReactLoading type="spin" />
          </div>
        ) : (
          <MapList
            maps={mapList.slice(8 * (currentPage - 1), 8 * currentPage)}
            galleryType={galleryType}
          />
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-1 mb-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        )}
        {currentPage <= 1 && <div style={{ width: 32, height: 32 }}></div>}

        <input
          type="number"
          className="w-12 rounded border border-gray-100 p-0 text-center text-xs font-medium [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          value={currentPage}
        />

        {mapList.length > currentPage * 8 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        )}
        {mapList.length <= currentPage * 8 && (
          <div style={{ width: 32, height: 32 }}></div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="w-60 inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
          onClick={handleNewMap}
        >
          Create New Map
        </button>
      </div>

      <ViewMap />
    </div>
  );
};

export default Gallery;
