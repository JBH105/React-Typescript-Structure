import file from '@assets/images/file.svg';
import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import PDFDrawer from '@shared/components/admin/PDFDrawer';
import { ImageComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useFormikContext } from 'formik';
import { useCallback, useState } from 'react';

const FileComponent: React.FC<ImageComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handlePdfClick = useCallback((url: string | null) => {
    setPdfUrl(url);
    setDrawerOpen(true);
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        setFieldValue(field.fieldName, file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setFileName(file.name);
      }
    },
    [field.fieldName, setFieldValue]
  );

  const handleReset = useCallback(() => {
    setFieldValue(field.fieldName, []);
    setImageUrl(null);
    setFileName(null);
    setPdfUrl(null);
  }, [field.fieldName, setFieldValue]);

  const handleFileInputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (imageUrl) {
        handlePdfClick(imageUrl);
      }
    },
    [imageUrl, handlePdfClick]
  );

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExtension = name.substring(0, name.lastIndexOf('.'));
    const truncatedName = nameWithoutExtension.substring(0, maxLength - 3 - (extension?.length || 0));
    return `${truncatedName}...${extension}`;
  };

  return (
    <div className="file-upload">
      {imageUrl ? (
        <div className="uploaded-file">
          {fileName?.toLowerCase().endsWith('.pdf') ? (
            <div className="inline-flex items-center justify-center space-x-2 my-4 bg-gray-100 rounded-full py-2 px-4">
              <DocumentIcon className="h-6 w-6" />
              <span className="font-medium text-gray-700 truncate max-w-[200px]" title={fileName}>
                {truncateFileName(fileName, 20)}
              </span>
            </div>
          ) : (
            <div>
              {imageUrl && (
                <img className="h-[100px] w-full max-w-fit mx-auto object-cover rounded-md mb-2" src={imageUrl} alt="Uploaded File" />
              )}
            </div>
          )}
          <div className="flex justify-center items-center mt-2">
            <input
              type="file"
              accept={field?.FileType ? field.FileType : '*'}
              onChange={handleChange}
              onClick={handleFileInputClick}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <Button variant="contained" size="small" color="warning" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      ) : (
        <div className="file-upload-placeholder text-center">
          {imageUrl ? (
            <img
              className="object-scale-down w-full h-32 max-w-[100px] mx-auto mb-4"
              src={(formik.values[field.fieldName] as string) || file}
              alt="upload"
            />
          ) : (
            <img className="object-scale-down w-full h-32 max-w-[100px] mx-auto mb-4" src={file} alt="upload" />
          )}
          <h3 className="text-lg font-semibold text-gray-700 mb-1">DROP FILE HERE</h3>
          <p className="text-sm text-gray-500 mb-4">Drag and drop your file here</p>
          <input type="file" onChange={handleChange} accept={field?.FileType ? field.FileType : '*'} />
        </div>
      )}
      <PDFDrawer open={drawerOpen} pdfUrl={pdfUrl} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default FileComponent;
