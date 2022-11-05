import { React, useEffect, useState } from "react";
import { getMaps } from "../../db/map";
import MapList from "./MapList";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { currentMapAtom } from "../../atoms/CurrentMapAtom";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import uuid from "react-uuid";
import { useAuthUser } from "../../hooks/useAuthUser";
import ReactLoading from "react-loading";

const Gallery = () => {
  const userAuth = useAuthUser();
  const [mapList, setMapList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setCanvasItems = useSetAtom(canvasItemsAtom);
  const setCurrentMap = useSetAtom(currentMapAtom);

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
  useEffect(() => {
    if (userAuth) {
      getMaps(userAuth.uid).then((res) => {
        setMapList(res);
        setLoading(false);
      });
    }
  }, [userAuth, setMapList]);

  return (
    <div className="w-screen">
      <div className="w-2/3 mx-auto mb-6 flex">
        <div className="basis-1/3 text-center cursor-pointer">My Gallery</div>
        <div className="basis-1/3 text-center">|</div>
        <div className="basis-1/3 text-center cursor-pointer">
          Friends' Gallery
        </div>
      </div>
      <div
        className="mx-auto flex flex-wrap gap-4 mb-4"
        style={{ width: 1048 }}
      >
        {loading ? (
          <div className="flex justify-center w-screen my-10">
            <ReactLoading type="spin" />
          </div>
        ) : (
          <MapList mapList={mapList} setMapList={setMapList} />
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-1 mb-4">
        <a
          href="/?page=1"
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
        </a>

        <input
          type="number"
          className="w-12 rounded border border-gray-100 p-0 text-center text-xs font-medium [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
          value="2"
        />

        <a
          href="/?page=3"
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
        </a>
      </div>

      <div className="flex justify-center">
        <button
          className="w-60 inline-block rounded-2xl border border-zinc-800 bg-zinc-800 px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:outline-none focus:ring active:text-zinc-800"
          onClick={handleNewMap}
        >
          Create New Map
        </button>
      </div>
    </div>
  );
};

export default Gallery;
