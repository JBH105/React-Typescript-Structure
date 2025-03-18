import { IDynamicFieldData } from "@core/dynamicForm/interfaces/DynamicForm";
import { Box } from "@mui/material";
import { selectComponentProps } from "@shared/interfaces/IGlobalProviderProps";
import { useFormikContext } from "formik";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const HTMLCode: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
    const formik = useFormikContext<IDynamicFieldData>();
    return (
        <>
            <Box className="flex items-center gap-2">
                <Box className="field">
                    <div className="jodit-editor">
                        <ReactQuill theme="snow" value={(formik?.values[field?.fieldName] as string || '')}
                            onChange={(newValue: string) => {
                                setFieldValue!(field?.fieldName, newValue);
                            }}
                            modules={{
                                toolbar: {
                                    container: [
                                        [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466",] }, , { 'background': [] }],
                                        ['blockquote', 'code-block'],
                                        ['link'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        [{ 'align': [] }],
                                        ["image"],
                                    ]
                                }
                            }}
                        />
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default HTMLCode;