import { async } from "@firebase/util";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { authUserAtom } from "../../atoms/authUser";
import { storage } from "../../client/firebase";

export const UploadImage = () => {
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
          return getDownloadURL(uploadRef);
        })
        //Promise.Allで解決したgetDownloadURLの戻り値をまとめて配列として返す。
      ).then((uploadedImageURLs) => {
        setUploadedImages(uploadedImageURLs);
      });
    });
  };

  useEffect(() => {
    console.log(userAuth.uid);
    getUploadedImages(ref(storage, `/images/${userAuth.uid}/`));
  }, []);

  return (
    <>
      <label className="block mb-1 text-sm font-medium text-gray-300">
        Upload images
      </label>
      <input
        type="file"
        className="text-sm"
        accept="image/*"
        onChange={uploadToServer}
      ></input>
      <div className="flex flex-wrap">
        {uploadedImages.map((uploadedPath) => {
          return (
            <img
              className="object-contain m-5"
              width={100}
              height={80}
              key={uploadedPath}
              alt={uploadedPath}
              src={uploadedPath}
            />
          );
        })}
      </div>
    </>
  );
};
