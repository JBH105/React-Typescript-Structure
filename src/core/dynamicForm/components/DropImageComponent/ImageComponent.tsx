import imageFile from '@assets/images/drop-file-img.png';
import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { APP_MESSAGES } from '@shared/constant/app-message';
import { ImageComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useFormikContext } from 'formik';
import { useState } from 'react';

interface DropImageComponentProps extends ImageComponentProps {
  allowedFileType?: string;
}

const DropImageComponent: React.FC<DropImageComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      if (!file.type.startsWith('image/')) {
        setError(APP_MESSAGES?.INVALID_IMAGE_FILE_TYPE);
        return;
      }

      setError(null);

      setFieldValue(field.fieldName, file);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  return (
    <div className="file-upload">
      {error && <p className="!text-red-600 mt-2 px-[0.2rem] text-center !text-[0.75rem] font-normal text-wrap break-words">{error}</p>}
      {fileUrl ? (
        <div>
          <p className="mb-[10px]">Uploaded File:</p>
          <img className="h-[100px] w-full max-w-fit mx-auto" src={fileUrl} alt="Uploaded File" />
          <input type="file" onChange={handleChange} />
        </div>
      ) : (
        <>
          <img
            className="object-scale-down w-full h-40 max-w-[150px] mx-auto"
            src={(formik.values[field.fieldName] as string) ? (formik.values[field.fieldName] as string) : imageFile}
            alt="upload"
          />
          <h3 className="text-center text-sm font-medium">DROP IMAGE HERE</h3>
          <p className="bg-[#EBEBEB] rounded-md py-1 px-4 text-xl font-medium mx-auto w-[90%] my-1">Browse</p>
          <input type="file" onChange={handleChange} />
        </>
      )}
    </div>
  );
};

export default DropImageComponent;
