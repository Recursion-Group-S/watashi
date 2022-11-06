import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from "jotai";
import { currentMapAtom, mapListAtom } from "../../atoms/CurrentMapAtom";
import { backgroundImageAtom, canvasItemsAtom } from "../../atoms/ComponentAtom";
import { deleteMap } from "../../db/map";
import { modalDispStatusAtom } from "../../atoms/GalleryAtom";

const MapList = ({ maps, galleryType }) => {
  const navigate = useNavigate();
  const setCanvasItems = useSetAtom(canvasItemsAtom);
  const setCurrentMap = useSetAtom(currentMapAtom);
  const [mapList, setMapList] = useAtom(mapListAtom)
  const setModalDispStatus = useSetAtom(modalDispStatusAtom);
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom)
  const handleEdit = (map) => {
    setCurrentMap(map);
    setCanvasItems(map.mapItems);
    let bgImage = new Image();
    bgImage.crossOrigin = 'anonymous'
    bgImage.onload = () => {
      setBackgroundImage(bgImage);
    }
    bgImage.src = map.backgroundImage;
    navigate(`/map/${map.mapID}`);
  };

  const handleView = (map) => {
    setCurrentMap(map);
    setModalDispStatus("");
  };

  return (
    <>
      {
        maps.map((map) => (
          <div
            className="bg-white rounded drop-shadow group m-1 mb-10"
            style={{ height: 250, width: 250 }}
            key={map.mapID}
          >
            <div>
              <img src={map.url} alt={map.mapTitle} className="rounded mb-1" />
              <p className="text-center text-sm">{map.mapTitle}</p>
            </div>
            <div
              className="hidden group-hover:block fixed top-0 left-0 z-100 bg-slate-300/50 rounded"
              style={{ height: 250, width: 250 }}>
              <div className="flex justify-center items-center" style={{ height: 250 }}>
                <div>
                  <button
                    onClick={() => handleView(map)}
                    className="cursor-pointer mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-zinc-800 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:ring active:text-zinc-800"
                  >
                    View
                  </button>
                  {galleryType === 'authUser' &&
                    <div>
                      <button
                        onClick={() => handleEdit(map)}
                        className="cursor-pointer mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-zinc-800 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:ring active:text-zinc-800"
                      >
                        Edit
                      </button>
                      <a
                        href={map.url}
                        download={`${map.mapTitle}.jpg`}
                        className="cursor-pointer mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-lime-500 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-lime-400 focus:ring active:text-lime-400"
                      >
                        Export
                      </a>
                      <button
                        onClick={() => {
                          deleteMap(map.mapID);
                          setMapList(
                            mapList.filter((mapItem) => mapItem.mapID !== map.mapID)
                          );
                        }}
                        className="cursor-pointer mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-red-400 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-red-400 focus:ring active:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default MapList;
