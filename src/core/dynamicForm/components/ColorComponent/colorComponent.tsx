import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorComponent: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
    const [color, setColor] = useState<string>()

    const handleChangeColor = (color: any) => {
        setFieldValue!(field.fieldName, color.hex);
        setColor(color.hex)
    };

    return (
        <div className="color-picker" style={{ width: '200px' }}>
            <SketchPicker
                color={color}
                onChangeComplete={handleChangeColor}
            />
        </div>
    );
};

export default ColorComponent;
