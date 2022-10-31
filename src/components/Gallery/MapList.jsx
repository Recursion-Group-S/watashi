import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { currentMapAtom } from "../../atoms/CurrentMapAtom";
import { canvasItemsAtom } from "../../atoms/ComponentAtom";
import { deleteMap } from "../../db/map";

const MapList = ({ mapList, setMapList }) => {
  const navigate = useNavigate();
  const setCanvasItems = useSetAtom(canvasItemsAtom);
  const setCurrentMap = useSetAtom(currentMapAtom);
  const handleEdit = (map) => {
    navigate(`/map/${map.mapID}`);
    setCurrentMap(map);
    setCanvasItems(map.mapItems);
  };

  return (
    <>
      {mapList.map((map) => (
        <div
          className="bg-white rounded drop-shadow cursor-pointer"
          style={{ height: 250, width: 250 }}
          key={map.mapID}
        >
          <a href={`map/${map.mapID}`}>
            <img src={map.url} alt={map.title} />
          </a>
          <button onClick={() => handleEdit(map)}>edit</button>

          <button
            onClick={() => {
              deleteMap(map.mapID);
              setMapList(
                mapList.filter((mapItem) => mapItem.mapID !== map.mapID)
              );
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default MapList;
