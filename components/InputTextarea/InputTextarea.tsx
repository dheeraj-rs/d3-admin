import { ChangeEvent } from 'react';
import styles from './InputTextarea.module.scss';

interface InputTextareaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    id?: string;
    rows?: number;
    cols?: number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
}

const InputTextarea = ({ value, onChange, id, rows = 4, cols, placeholder, disabled, className, required }: InputTextareaProps) => {
    return <textarea id={id} value={value} onChange={onChange} rows={rows} cols={cols} placeholder={placeholder} disabled={disabled} className={`${styles.textarea} ${className}`} required={required} />;
};

export default InputTextarea;
