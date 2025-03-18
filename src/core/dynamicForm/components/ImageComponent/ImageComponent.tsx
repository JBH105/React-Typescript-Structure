import student from '@assets/images/user_img.png';
import { ImageComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { FaPen } from 'react-icons/fa';

const ImageComponent: React.FC<ImageComponentProps> = ({ field, setFieldValue }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue(field.fieldName, file);
    }
  };

  return (
    <label className="image_select_outer">
      <span className="browse-files">
        <input className="input_file" type="file" name={field.fieldName} accept="*" onChange={handleImageChange} />
        <img src={student} alt="" />
      </span>
      <div className="edit_icon">
        <FaPen />
      </div>
    </label>
  );
};

export default ImageComponent;
