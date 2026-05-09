import { useState, useEffect } from 'react';

export const useResponsiveCount = (containerRef, itemWidth, gap = 16) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateCount = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                if (width === 0) return;

                const calculated = Math.floor((width + gap) / (itemWidth + gap));
                // Ensure at least 2 items are shown if there's space for them
                setCount(Math.max(2, calculated));
            }
        };

        const observer = new ResizeObserver(updateCount);
        observer.observe(containerRef.current);

        updateCount();

        return () => observer.disconnect();
    }, [containerRef, itemWidth, gap]);

    return count;
};