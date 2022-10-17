import { getBytes, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { storage } from "../../client/firebase";

export const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };
  const postImage = async (image = null) => {
    let uploadResult = "";
    if (image.name) {
      const storageRef = ref(storage);
      const ext = image.name.split(".").pop();
      const hashName = Math.random().toString(36).slice(-8);
      const fullPath = "/images/" + hashName + "." + ext;
      const uploadRef = ref(storageRef, fullPath);

      await uploadBytes(uploadRef, image).then(async (result) => {
        console.log(result);
        console.log("Uploaded a blob or file!");

        await getDownloadURL(uploadRef).then((url) => {
          uploadResult = url;
        });
      });
    }
    return uploadResult;
  };
  const uploadToServer = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const result = await postImage(event.target.files[0]);
      console.log(result);
    }
  };

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
      {/* {uploadedImages.map(uploadedImage =>
        
        )}
      <img
        alt={image}
        className="flex justify-center items-center"
        src={createObjectURL}
      /> */}
    </>
  );
};
