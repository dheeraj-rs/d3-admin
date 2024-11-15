import { FC, useState, ChangeEvent } from 'react';
import './Password.scss';

interface PasswordProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    inputId?: string;
    placeholder?: string;
}

const Password: FC<PasswordProps> = ({ value, onChange, className = '', inputId, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`password-wrapper ${className}`}>
            <input id={inputId} type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} className="password-input" placeholder={placeholder} />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
        </div>
    );
};

export default Password;
