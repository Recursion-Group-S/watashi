import { async } from "@firebase/util";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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
export const getMaps = async (uid) => {
  const q = query(collection(db, "maps"), where("author", "==", uid));
  const querySnapshot = await getDocs(q);
  return await Promise.all(querySnapshot.docs.map((doc) => {
    return doc.data();
  }));
}

export const deleteMap = async (mapID) => {
  await deleteDoc(doc(db, "maps", mapID));
}