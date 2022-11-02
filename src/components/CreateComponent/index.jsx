import React, { useEffect } from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import CanvasArea from "./CanvasArea";
import Sidebar from "./Sidebar";
import SaveMapModal from "../../modals/SaveMapModal";
import { useAtom, useAtomValue } from "jotai";
import { canvasItemsAtom, canvasRefAtom } from "../../atoms/ComponentAtom";
import { useParams } from "react-router-dom";
import { fetchCurrentMap } from "../../db/map";
import { currentMapAtom } from "../../atoms/CurrentMapAtom";
import { auth } from "../../client/firebase";

const CreateComponent = () => {
  const WrappedCanvasArea = forwardRef(CanvasArea);
  const canvasRef = useRef();
  const [, setCanvasAtom] = useAtom(canvasRefAtom);
  const params = useParams();
  const [currentMap, setCurrentMap] = useAtom(currentMapAtom);
  const [canvasItems, setCanvasItems] = useAtom(canvasItemsAtom);

  const createNewMap = () => {
    const newMap = {
      mapID: params.mapID,
      mapTitle: "title",
      author: auth.currentUser.uid,
      url: '',
      mapItems: [],
      backgroundColor: 'white',
      createdAt: Date(),
    }
    return newMap;
  }

  useEffect(() => {
    setCanvasAtom(canvasRef);
    fetchCurrentMap(params.mapID).then(res => {
      if(res === null){
        setCurrentMap(createNewMap());
      } else{
        setCurrentMap(res);
        setCanvasItems(res.mapItems);
      }
    })
  }, [])

  if(!currentMap){
    return <div>loading</div>
  }

  return (
    <div className="flex gap-x-4">
      <WrappedCanvasArea ref={canvasRef} />
      <Sidebar />
      <SaveMapModal />
    </div>
  );
};

export default CreateComponent;