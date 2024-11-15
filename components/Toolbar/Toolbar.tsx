import { ReactNode } from 'react';
import styles from './Toolbar.module.scss';

interface ToolbarProps {
    start?: ReactNode | (() => ReactNode);
    end?: ReactNode | (() => ReactNode);
    left?: ReactNode | (() => ReactNode);
    right?: ReactNode | (() => ReactNode);
    className?: string;
}

const Toolbar = ({ start, end, left, right, className = '' }: ToolbarProps) => {
    return (
        <div className={`${styles.toolbar} ${className}`.trim()}>
            {(start || left) && <div className={styles.toolbar__left}>{start ? (typeof start === 'function' ? start() : start) : typeof left === 'function' ? left() : left}</div>}
            {(end || right) && <div className={styles.toolbar__right}>{end ? (typeof end === 'function' ? end() : end) : typeof right === 'function' ? right() : right}</div>}
        </div>
    );
};

export default Toolbar;
