import { useUploadImg } from "../../hooks/useUploadimg";

export const UploadImage = () => {
  const { uploadedImages, uploadToServer } = useUploadImg();
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
