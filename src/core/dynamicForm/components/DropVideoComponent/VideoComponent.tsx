import imageFile from '@assets/images/drop-file-img.png';
import { VideoComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useState } from 'react';

const DropVideoComponent: React.FC<VideoComponentProps> = ({ field, setFieldValue }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFieldValue(field.fieldName, file);
      const url = URL.createObjectURL(file);
      setFileUrl(url); 
    }
  };

  return (
    <div className="file-upload">
      {fileUrl ? (
        <div>
          <p className="mb-[10px]">Uploaded Video:</p>
          <video className="h-[200px] w-full max-w-fit mx-auto" controls>
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <input type="file" accept="video/*" onChange={handleChange} />
        </div>
      ) : (
        <>
          <img
            className="object-scale-down w-full h-48 max-w-[150px] mx-auto"
            src={imageFile}
            alt="upload video"
          />
          <h3>DROP VIDEO HERE</h3>
          <p className="bg-[#EBEBEB] rounded-md py-1 px-4 text-xl font-medium mx-auto w-[90%] mt-1 mb-2">Browse</p>
          <input type="file" accept="video/*" onChange={handleChange} />
        </>
      )}
    </div>
  );
};

export default DropVideoComponent;
