import { FileComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import imageFile from '@assets/images/drop-file-img.png';
import { useState } from 'react';
import showToast from '@core/toaster/notification.service';

const DropFileComponent: React.FC<FileComponentProps> = ({ field, setFieldValue }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Optional: Check if the file type matches the expected type
      if (field?.FileType && !file.type.includes(field?.FileType)) {
        showToast(`Invalid file type. Please upload a ${field?.FileType} file.`, 'error');
        return;
      }

      setFieldValue(field.fieldName, file);
      setFileName(file.name);
    }
  };

  return (
    <div className="file-upload">
      {fileName ? (
        <div>
          <p className="my-5">
            Uploaded File: <strong>{fileName}</strong>
          </p>
          <input type="file" onChange={handleChange} accept={field?.FileType ? field.FileType : undefined} />
        </div>
      ) : (
        <>
          <img className="object-scale-down w-full h-48 max-w-[150px] mx-auto" src={imageFile} alt="upload" />
          <h3>DROP FILE HERE</h3>
          <p className="bg-[#EBEBEB] rounded-md py-1 px-4 text-xl font-medium mx-auto w-[90%] mt-1">Browse</p>
          <input type="file" onChange={handleChange} accept={field?.FileType ? field.FileType : undefined} />
        </>
      )}
    </div>
  );
};

export default DropFileComponent;
