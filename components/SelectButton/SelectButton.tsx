import { FC } from 'react';
import styles from './SelectButton.module.scss';

interface SelectButtonOption {
    name: string;
    code: string;
}

interface SelectButtonProps {
    value: SelectButtonOption | SelectButtonOption[] | null;
    onChange: (e: { value: SelectButtonOption | SelectButtonOption[] | null }) => void;
    options: SelectButtonOption[];
    optionLabel: string;
    multiple?: boolean;
}

const SelectButton: FC<SelectButtonProps> = ({ value, onChange, options, optionLabel, multiple = false }) => {
    const handleClick = (option: SelectButtonOption) => {
        if (multiple) {
            const currentValue = Array.isArray(value) ? value : [];
            const newValue = currentValue.includes(option) ? currentValue.filter((item) => item !== option) : [...currentValue, option];
            onChange({ value: newValue });
        } else {
            onChange({ value: value === option ? null : option });
        }
    };

    return (
        <div className={styles.selectButton}>
            {options.map((option) => (
                <button key={option.code} className={`${styles.option} ${multiple ? ((value as SelectButtonOption[])?.includes(option) ? styles.selected : '') : value === option ? styles.selected : ''}`} onClick={() => handleClick(option)}>
                    {option[optionLabel as keyof SelectButtonOption]}
                </button>
            ))}
        </div>
    );
};

export default SelectButton;
