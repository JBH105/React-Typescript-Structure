import { IDynamicFieldData } from "@core/dynamicForm/interfaces/DynamicForm";
import { selectComponentProps } from "@shared/interfaces/IGlobalProviderProps";
import { useFormikContext } from "formik";

const Checkbox: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
    const formik = useFormikContext<IDynamicFieldData>();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setFieldValue!(field.fieldName, newValue);
    };

    return (
        <div className="w-full px-[15px] my-[15px]">
            <label className="checkbox-btn">
                <input
                    name={field.fieldName}
                    type="checkbox"
                    checked={formik.values[field.fieldName] as boolean}
                    onChange={handleChange}
                />
                <span></span>
                {field.spanName}
            </label>
        </div>
    );
};

export default Checkbox;
