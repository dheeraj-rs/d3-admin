interface ProgressBarProps {
    value?: number | string;
    showValue?: boolean;
    style?: React.CSSProperties;
}

export const ProgressBar = ({ value = 0, showValue = true, style }: ProgressBarProps) => {
    const percentage = typeof value === 'string' ? parseInt(value) : value;
    const validPercentage = Math.max(0, Math.min(100, isNaN(percentage) ? 0 : percentage));

    return (
        <div className="progress-bar" style={style}>
            <div className="progress-bar__fill" style={{ width: `${validPercentage}%` }}>
                {showValue && <span className="progress-bar__label">{validPercentage}%</span>}
            </div>
        </div>
    );
};
