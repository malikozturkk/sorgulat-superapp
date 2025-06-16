import React from 'react';

interface LayoutShiftPreventionProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    minHeight?: string | number;
    minWidth?: string | number;
    aspectRatio?: string;
}

const LayoutShiftPrevention: React.FC<LayoutShiftPreventionProps> = ({
    children,
    className = "",
    style = {},
    minHeight,
    minWidth,
    aspectRatio
}) => {
    const containerStyle: React.CSSProperties = {
        ...style,
        ...(minHeight && { minHeight }),
        ...(minWidth && { minWidth }),
        ...(aspectRatio && { aspectRatio }),
        contain: 'layout style paint',
    };

    return (
        <div 
            className={`layout-shift-prevention ${className}`}
            style={containerStyle}
        >
            {children}
        </div>
    );
};

export default LayoutShiftPrevention; 