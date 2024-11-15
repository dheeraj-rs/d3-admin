import React from 'react';
import './Dialog.scss';

interface DialogProps {
    visible: boolean;
    onHide: () => void;
    header?: string;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    modal?: boolean;
    className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ visible, onHide, header, footer, children, style, modal }) => {
    if (!visible) return null;

    return (
        <div className="dialog-wrapper">
            <div className="dialog-overlay" onClick={onHide} />
            <div className="dialog" style={style}>
                {header && <div className="dialog__header">{header}</div>}
                <div className="dialog__content">{children}</div>
                {footer && <div className="dialog__footer">{footer}</div>}
            </div>
        </div>
    );
};
