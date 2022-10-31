import { useAtom } from "jotai";
import { useUploadImg } from "../../../hooks/useUploadimg";
import { backgroundImageAtom, canvasRefAtom } from "../../../atoms/ComponentAtom";
import { useNewItem } from "../../../hooks/useNewItem";
import { useState, useRef } from "react";

const ImageTab = () => {
    const { uploadedImages, uploadToServer, deleteUploadedImage } = useUploadImg();
    const [canvasAtom] = useAtom(canvasRefAtom);
    const [shift, setShift] = useState({ x: 0, y: 0 });
    const { isValidDrop, addItem } = useNewItem();
    const setBgRef = useRef(null);
    const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);

    const handleShift = (e) => {
        setShift({
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top
        })
    }

    const setBackgroundImg = (e) => {
        let newBg = new Image();
        newBg.crossOrigin = 'anonymous';
        newBg.src = e.target.src;
        setBackgroundImage(newBg);
    }

    const addImage = (e) => {
        e.preventDefault(e);
        if(!backgroundImage.src && isValidDrop(e, setBgRef)){
            setBackgroundImg(e);
            return;
        }
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
        <>
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
            <div className="overflow-y-scroll border rounded-lg p-3" style={{ height: 360 }}>
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
            <div>
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-300">Background Image</label>
                <div className="border rounded flex justify-center items-center" style={{height: 110}}
                >
                    {backgroundImage.src && 
                    <div className="relative" style={{height: 100, width: 100}}>
                        <img src={backgroundImage.src} />
                        <button className="absolute border align-middle rounded-full bg-gray-300 text-lg -top-2 -right-2 w-7 h-7 flex justify-center items-center border-white border-2"
                            onClick={() => {
                                setBackgroundImage(new Image())
                            }}
                        ><div className="">×</div>
                        </button>
                    </div>
                    }
                    {!backgroundImage.src && 
                    <div className="border-dashed border-2 flex justify-center items-center" style={{height: 100, width: 100}}
                        ref={setBgRef}
                        onDragOver={(e)=> e.preventDefault()}>
                        <p className="text-slate-400">drop here</p>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ImageTab;