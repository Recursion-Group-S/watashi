import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from "jotai";
import { currentMapAtom, mapListAtom } from "../../atoms/CurrentMapAtom";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import { deleteMap } from "../../db/map";
import { modalDispStatusAtom } from "../../atoms/GalleryAtom";

const MapList = ({maps, galleryType}) => {
  const navigate = useNavigate();
  const setCanvasItems = useSetAtom(canvasItemsAtom);
  const setCurrentMap = useSetAtom(currentMapAtom);
  const [mapList, setMapList] = useAtom(mapListAtom)
  const setModalDispStatus = useSetAtom(modalDispStatusAtom);
  const handleEdit = (map) => {
    navigate(`/map/${map.mapID}`);
    setCurrentMap(map);
    setCanvasItems(map.mapItems);
  };

  const handleView = (map) => {
    setCurrentMap(map);
    setModalDispStatus("");
  };

  return (
    <div className="flex flex-wrap mt-4" style={{height: maps.length > 0 ? 600 : 0}}>

      {maps.map((map) => (
        <div
          className="bg-white rounded drop-shadow cursor-pointer group m-1 mb-10"
          style={{ height: 250, width: 250 }}
          key={map.mapID}
        >
          <img src={map.url} alt={map.mapTitle} />
          <p className="mt-1 text-center">{map.mapTitle}</p>
          <div
            className="hidden group-hover:block fixed top-0 left-0 z-100 bg-slate-300/50 rounded"
            style={{ height: 250, width: 250 }}>
            <div className="flex justify-center items-center" style={{ height: 250 }}>
              <div>
                <button
                  onClick={() => handleView(map)}
                  className="mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-zinc-800 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:ring active:text-zinc-800"
                >
                  View
                </button>
                {galleryType === 'authUser' && 
                <button
                  onClick={() => handleEdit(map)}
                  className="mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-zinc-800 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 focus:ring active:text-zinc-800"
                >
                  Edit
                </button>
                }
                {galleryType === 'authUser' && 
                <a
                  href={map.url}
                  download={`${map.mapTitle}.jpg`}
                  className="mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-green-500 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-red-400 focus:ring active:text-red-400"
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
                  className="mx-auto my-1 shadow text-center block rounded-2xl border-2 border-white bg-red-400 px-4 py-1 text-sm font-medium text-white hover:bg-white hover:text-red-400 focus:ring active:text-red-400"
                >
                  Delete
                </button>
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapList;
