import React from 'react';
import './BreadCrumb.scss';

interface BreadCrumbItem {
    label?: string;
    url?: string;
    icon?: string;
}

interface BreadCrumbProps {
    model: BreadCrumbItem[];
    home?: BreadCrumbItem;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ model, home }) => {
    return (
        <nav className="breadcrumb">
            <ul className="breadcrumb__list">
                {home && (
                    <li className="breadcrumb__item">
                        <a href={home.url} className="breadcrumb__link">
                            {home.icon && <i className={`breadcrumb__icon ${home.icon}`} />}
                            <span>{home.label}</span>
                        </a>
                        <span className="breadcrumb__separator">/</span>
                    </li>
                )}
                {model.map((item, index) => (
                    <li key={index} className="breadcrumb__item">
                        <a href={item.url} className="breadcrumb__link">
                            {item.icon && <i className={`breadcrumb__icon ${item.icon}`} />}
                            <span>{item.label}</span>
                        </a>
                        {index < model.length - 1 && <span className="breadcrumb__separator">/</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
