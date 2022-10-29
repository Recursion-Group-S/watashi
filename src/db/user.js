import { doc, setDoc } from "firebase/firestore"
import { db } from "../client/firebase"

export const postUser = (uid, name, email, iconUrl) => {
  const userCollectionRef = doc(db, "users", uid);
  setDoc(userCollectionRef, {
    name: name,
    email: email,
    iconUrl: iconUrl
  });
}
