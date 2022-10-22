import { doc, setDoc } from "firebase/firestore"
import { db } from "../client/firebase"

export const postUser = (uid, name, email, iconUrl) => {
  const userCollectionRef = doc(db, "users", uid);
  console.log(userCollectionRef)
  setDoc(userCollectionRef, {
    name: name,
    email: email,
    iconUrl: iconUrl
  });
}
