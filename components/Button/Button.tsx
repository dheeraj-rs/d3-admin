import React from 'react';
import './Button.scss';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label?: string;
    icon?: string;
    iconPos?: 'left' | 'right';
    severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'help' | 'danger' | 'info';
    size?: 'small' | 'medium' | 'large';
    outlined?: boolean;
    text?: boolean;
    raised?: boolean;
    rounded?: boolean;
    link?: boolean;
    loading?: boolean;
    className?: string;
    tooltip?: string;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ label, icon, iconPos = 'left', severity, size, outlined, text, raised, rounded, link, loading, className, tooltip, children, disabled, ...props }, ref) => {
    const classes = [
        'custom-button',
        'p-ripple',
        severity && `custom-button--${severity}`,
        size && `custom-button--${size}`,
        outlined && 'custom-button--outlined',
        text && 'custom-button--text',
        raised && 'custom-button--raised',
        rounded && 'custom-button--rounded',
        link && 'custom-button--link',
        loading && 'custom-button--loading',
        disabled && 'custom-button--disabled',
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button ref={ref} className={classes} disabled={disabled || loading} title={tooltip} {...props}>
            {loading && <i className="custom-icon pi pi-spinner custom-button__spinner" />}
            {icon && iconPos === 'left' && <i className={`custom-icon ${icon}`} />}
            {label && <span className="custom-button__label">{label}</span>}
            {icon && iconPos === 'right' && <i className={`custom-icon ${icon}`} />}
            {children}
            <span className="p-ink"></span>
        </button>
    );
});

Button.displayName = 'Button';
