import React, { Suspense, lazy } from 'react';

interface LazyLoadProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    minHeight?: string | number;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
    children, 
    fallback = (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    ),
    minHeight
}) => {
    return (
        <Suspense fallback={
            <div 
                className="w-full"
                style={minHeight ? { minHeight } : undefined}
            >
                {fallback}
            </div>
        }>
            {children}
        </Suspense>
    );
};

export default LazyLoad; 