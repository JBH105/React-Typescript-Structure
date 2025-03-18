import imageFile from '@assets/images/file.svg';
import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Button } from '@mui/material';
import ImageCropper from '@shared/components/common/ImageCropper';
import { ImageComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { base64ToFile } from '@shared/utils/cropUtils';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface ImageUploadingButtonProps {
  value: ImageListType;
  onChange: (imageList: ImageListType) => void;
}

const ImageUploadingButton: React.FC<ImageUploadingButtonProps> = ({ value, onChange, ...props }) => {
  return (
    <ImageUploading value={value} onChange={onChange}>
      {({ onImageUpload, onImageUpdate }) => (
        <Button
          color="primary"
          onClick={value.length ? onImageUpload : () => onImageUpdate(0)}
          {...props}
        >
        </Button>
      )}
    </ImageUploading>
  );
};

const ImageCrop: React.FC<ImageComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();

  const [image, setImage] = useState<ImageListType>([]);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageChange = (imageList: ImageListType) => {
    setDialogOpen(true);
    setImage(imageList);
  };

  const handleComplete = async (imagePromise: Promise<string>) => {
    const croppedImage = await imagePromise;
    setCroppedImage(croppedImage);
    setDialogOpen(false);

    // Convert the base64 cropped image to File object
    const file = base64ToFile(croppedImage, 'cropped-image.jpg');

    // Update Formik's field value
    setFieldValue(field.fieldName, file);
  };
  const aspectRatio: number = typeof field?.imageAspect === 'number' ? field.imageAspect : 1;

  return (
    <label className="file-upload">
      <div className="App">
        <ImageUploadingButton
          value={image}
          onChange={handleImageChange}
        />
        <ImageCropper
          open={dialogOpen}
          image={image.length > 0 ? image[0].dataURL : undefined}
          onComplete={handleComplete}
          aspect={aspectRatio}
          containerStyle={{
            position: 'relative',
            width: 550,
            height: 500,
            background: '#333',
          }}
          onClose={() => setDialogOpen(false)}
        />
        <img
          className="object-scale-down w-full h-48 max-w-[150px] mx-auto"
          src={croppedImage ? croppedImage : formik.values[field.fieldName] ? (formik.values[field.fieldName] as string) : imageFile}
          alt="upload"
        />
        <h3>DROP FILE HERE</h3>
        <p>Drag and drop your file here</p>
      </div>
    </label>
  );
};

export default ImageCrop;
