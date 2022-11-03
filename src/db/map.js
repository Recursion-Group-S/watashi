import { async } from "@firebase/util";
import { collection, deleteDoc, doc, getDocs, getDoc, query, setDoc, where } from "firebase/firestore";
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
export const getMaps = async (uid, type) => {
  const q = type === 'user' ? query(collection(db, "maps"), where("author", "==", uid)) 
                            : query(collection(db, "maps"), where("author", "!=", uid));
  const querySnapshot = await getDocs(q);
  return await Promise.all(querySnapshot.docs.map((doc) => {
    return doc.data();
  }));
}

export const deleteMap = async (mapID) => {
  await deleteDoc(doc(db, "maps", mapID));
}

export const fetchCurrentMap = async (mapID) => {
  const docRef = doc(db, "maps", mapID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}