import { useAtom } from "jotai";
import { useUploadImg } from "../../../hooks/useUploadimg";
import { canvasRefAtom } from "../../../atoms/ComponentAtom";
import { useNewItem } from "../../../hooks/useNewItem";
import { useState } from "react";

const ImageTab = () => {
    const { uploadedImages, uploadToServer, deleteUploadedImage } = useUploadImg();
    const [canvasAtom] = useAtom(canvasRefAtom);
    const [shift, setShift] = useState({ x: 0, y: 0 });
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
            type: 'image'
        }
        addItem(newImage, canvasAtom);
    }
    return (
        <div className="bg-white px-8 pt-2 pb-4 rounded-xl">
            <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-300">
                    Upload images
                </label>
                <input
                    type="file"
                    className="text-sm"
                    accept="image/*"
                    onChange={uploadToServer}
                ></input>
            </div>
            <div className="overflow-y-scroll border rounded-lg p-3" style={{ height: 496 }}>
                <div className="flex flex-wrap justify-between">
                    {uploadedImages.map((uploadedPath) => {
                        return (
                            <>
                                {/* UIの変更 */}
                                <div className="relative mb-5" key={uploadedPath.path}>
                                    <img
                                        className="object-contain"
                                        width={100}
                                        height={80}
                                        key={uploadedPath.path}
                                        alt={uploadedPath.path}
                                        src={uploadedPath.url}
                                        draggable
                                        onDragEnd={addImage}
                                        onDragStart={handleShift}
                                    />
                                    <button className="absolute border align-middle rounded-full bg-gray-300 text-lg -top-2 -right-2 w-7 h-7 flex justify-center items-center border-white border-2"
                                        onClick={() => {
                                            deleteUploadedImage(uploadedPath.path);
                                        }}
                                    ><div className="">×</div>
                                    </button>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ImageTab;