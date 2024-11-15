import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import './Menu.scss';

interface MenuItem {
    label?: string;
    icon?: string;
    command?: () => void;
    separator?: boolean;
}

interface MenuProps {
    model: MenuItem[];
    popup?: boolean;
}

export interface MenuRef {
    toggle: (event: React.MouseEvent) => void;
    hide: () => void;
}

// Add this type declaration
type MenuComponent = React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>>;

const Menu: MenuComponent = forwardRef<MenuRef, MenuProps>(({ model, popup }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
        toggle: (event: React.MouseEvent) => {
            event.stopPropagation();
            if (popup) {
                const rect = (event.target as HTMLElement).getBoundingClientRect();
                setPosition({
                    x: rect.left,
                    y: rect.bottom
                });
            }
            setVisible(!visible);
        },
        hide: () => {
            setVisible(false);
        }
    }));

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.custom-menu')) {
                setVisible(false);
            }
        };

        if (visible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            className={`custom-menu ${popup ? 'popup' : ''}`}
            style={
                popup
                    ? {
                          position: 'fixed',
                          left: `${position.x}px`,
                          top: `${position.y}px`
                      }
                    : {}
            }
        >
            <ul className="menu-list">
                {model.map((item, index) =>
                    item.separator ? (
                        <li key={index} className="menu-separator" />
                    ) : (
                        <li
                            key={index}
                            className="menu-item"
                            onClick={() => {
                                if (item.command) {
                                    item.command();
                                }
                                setVisible(false);
                            }}
                        >
                            {item.icon && <i className={`menu-icon ${item.icon}`} />}
                            <span className="menu-label">{item.label}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
});

Menu.displayName = 'Menu';

export {Menu};
