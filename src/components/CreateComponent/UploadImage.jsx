import { useAtom } from "jotai";
import { useUploadImg } from "../../hooks/useUploadimg";
import { canvasImagesAtom, canvasRefAtom } from "../../atoms/ComponentAtom";
import { useNewItem } from "../../hooks/useNewItem";

export const UploadImage = () => {
  const { uploadedImages, uploadToServer, deleteUploadedImage } = useUploadImg();
  const [canvasAtom] = useAtom(canvasRefAtom);
  const [canvasImages, setCanvasImages] = useAtom(canvasImagesAtom)
  const { isValidDrop, createAddItem } = useNewItem();
  
  const addImage = (e) => {
    e.preventDefault();
        if (!isValidDrop(e, canvasAtom)) {
            return;
        }
        const image = uploadedImages.find(img => img.path === e.target.alt);
        let newImage = {
          x: e.clientX,
          y: e.clientY,
          url: image.url,
        }
        createAddItem(newImage, canvasAtom, canvasImages, setCanvasImages);
        /*
            shift座標の計算
            CanvasAreaのLayerにImageとしてcanvasImagesを追加(ImageComponentsとほぼ同じ)
            Icon削除、選択作業(selectedText --> selectedItem) CanvasArea
        */
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
