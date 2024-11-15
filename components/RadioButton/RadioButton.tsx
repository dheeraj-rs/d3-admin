import React from 'react';
import './RadioButton.scss';

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: { value: string }) => void;
    inputId: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, onChange, inputId }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ value: e.target.value });
    };

    return (
        <div className="radio-button">
            <input type="radio" id={inputId} name={name} value={value} checked={checked} onChange={handleChange} />
            <span className="radio-button__custom"></span>
        </div>
    );
};

export default RadioButton;
