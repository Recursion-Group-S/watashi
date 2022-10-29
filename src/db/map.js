import { doc, setDoc } from "firebase/firestore";
import { db } from "../client/firebase";

export const postMap = (map) => {
  const mapCollectionRef = doc(db, "maps", map.mapID);
  setDoc(mapCollectionRef, {
    mapID: map.mapID,
    mapTitle: map.mapTitle,
    author: map.author,
    url: map.url,
    mapItems: map.mapItems,
    backgroundColor: map.backgroundColor,
    createdAt: map.createdAt
  });
}
