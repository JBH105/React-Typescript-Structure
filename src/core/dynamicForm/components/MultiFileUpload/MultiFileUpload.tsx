import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import imageFile from '@assets/images/drop-file-img.png';

const MultiFileUpload: React.FC<ImageComponentProps> = ({ field, setFieldValue, value }) => {
    const [selectedFiles, setSelectedFiles] = useState<(File | string)[]>(value && value[field.fieldName] || []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const updatedFiles = [...selectedFiles, ...acceptedFiles];
        setSelectedFiles(updatedFiles);
        setFieldValue(field.fieldName, updatedFiles);
    }, [selectedFiles, setFieldValue, field]);

    const removeFile = (fileIndex: number) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
        setSelectedFiles(updatedFiles);
        setFieldValue(field.fieldName, updatedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx'],
            'application/vnd.ms-excel': ['.xls', '.xlsx'],
        },
        multiple: true,
    });

    return (
        <Box className="file-upload items-center">
            <img
                className="object-scale-down flex w-full"
                src={imageFile}
                alt="upload"
            />
            <Box
                {...getRootProps()}
                sx={{
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="body1">Drag and drop files here, or click to select files</Typography>
            </Box>

            <Stack spacing={1} mt={2}>
                {selectedFiles && selectedFiles?.map((file, index) => (
                    <Chip
                        key={index}
                        label={file instanceof File ? file.name : file}
                        onDelete={() => removeFile(index)}
                        deleteIcon={<TrashIcon style={{ width: '16px', height: '16px' }} />}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default MultiFileUpload;
