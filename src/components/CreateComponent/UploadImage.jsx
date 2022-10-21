import { useAtom } from "jotai";
import { useUploadImg } from "../../hooks/useUploadimg";
import { canvasImagesAtom, canvasRefAtom } from "../../atoms/ComponentAtom";
import { useNewItem } from "../../hooks/useNewItem";
import { useState } from "react";

export const UploadImage = () => {
  const { uploadedImages, uploadToServer, deleteUploadedImage } = useUploadImg();
  const [canvasAtom] = useAtom(canvasRefAtom);
  const [shift, setShift] = useState({x: 0, y: 0});
  const { isValidDrop, addItem } = useNewItem();
  
  const handleShift = (e) => {
    setShift({
      x: e.clientX - e.target.getBoundingClientRect().left, 
      y: e.clientY - e.target.getBoundingClientRect().top
    })
  }

  const addImage = (e) => {
    e.preventDefault();
        if (!isValidDrop(e, canvasAtom)) {
            return;
        }
        const image = uploadedImages.find(img => img.path === e.target.alt);
        let newImage = {
          x: e.clientX - shift.x,
          y: e.clientY - shift.y,
          url: image.url,
        }
        addItem(newImage, canvasAtom);
  }
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
            <>
            {/* UIの変更 */}
              <img
                className="object-contain m-5"
                width={100}
                height={80}
                key={uploadedPath.path}
                alt={uploadedPath.path}
                src={uploadedPath.url}
                draggable
                onDragEnd={addImage}
                onDragStart={handleShift}
              />
              <button
                onClick={() => {
                  deleteUploadedImage(uploadedPath.path);
                }}
              >
                削除
              </button>
            </>
          );
        })}
      </div>
    </>
  );
};
