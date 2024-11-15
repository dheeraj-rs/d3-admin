import { FC, useState } from 'react';
import './Dropdown.scss';

export interface DropdownChangeEvent {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface DropdownProps {
    id?: string;
    value: any;
    options: any[];
    onChange: (e: DropdownChangeEvent) => void;
    optionLabel?: string;
    placeholder?: string;
    className?: string;
    itemTemplate?: (option: any) => React.ReactNode;
    showClear?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({ id, value, options, onChange, optionLabel = 'label', placeholder, className, itemTemplate, showClear = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`custom-dropdown ${className || ''}`}>
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{value ? value[optionLabel] : placeholder}</span>
                {showClear && value && (
                    <span
                        className="clear-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange({ originalEvent: e, value: null });
                        }}
                    >
                        ×
                    </span>
                )}
                <span className="arrow">▼</span>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={(event) => {
                                onChange({
                                    originalEvent: event,
                                    value: option
                                });
                                setIsOpen(false);
                            }}
                        >
                            {itemTemplate ? itemTemplate(option) : option[optionLabel]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
