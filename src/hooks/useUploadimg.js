import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { authUserAtom } from "../atoms/authUser";
import { storage } from "../client/firebase";

export const useUploadImg = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const userAuth = useAtomValue(authUserAtom);

  const postImage = async (image = null) => {
    let uploadResult = "";
    if (image.name) {
      const storageRef = ref(storage);
      const ext = image.name.split(".").pop();
      const hashName = Math.random().toString(36).slice(-8);
      const fullPath = `/images/${userAuth.uid}/` + hashName + "." + ext;
      const uploadRef = ref(storageRef, fullPath);

      await uploadBytes(uploadRef, image);
    }
    return uploadResult;
  };
  const uploadToServer = async (event) => {
    if (event.target.files && event.target.files[0]) {
      await postImage(event.target.files[0]);
      await getUploadedImages(ref(storage, `/images/${userAuth.uid}/`));
    }
  };
  const getUploadedImages = async (reference) => {
    const storageRef = ref(storage);
    //listAllでアップロードした画像のfullPathを入手
    await listAll(reference).then(async (result) => {
      //入手したパスを用いて画像URLを取得。
      await Promise.all(
        result.items.map(async (reference) => {
          const uploadRef = ref(storageRef, reference.fullPath);
          const res = {
            path: reference.fullPath,
            url: await getDownloadURL(uploadRef),
          };
          return res;
        })
        //Promise.Allで解決したgetDownloadURLの戻り値をまとめて配列として返す。
      ).then((uploadedImageURLs) => {
        setUploadedImages(uploadedImageURLs);
      });
    });
  };
  const deleteUploadedImage = async (path = null) => {
    const copyArray = [...uploadedImages].filter(uploadedImage => uploadedImage.path !== path);
    setUploadedImages(copyArray);
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
  }

  useEffect(() => {
    getUploadedImages(ref(storage, `/images/${userAuth.uid}/`));
  }, []);

  return { uploadedImages, uploadToServer, deleteUploadedImage }
}