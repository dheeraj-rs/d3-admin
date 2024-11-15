import { useEffect, useRef } from 'react';
import CustomPrime from '@/lib/CustomPrimeAPI';

export const useRippleEffect = () => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (element && CustomPrime.ripple) {
            element.classList.add('p-ripple');
        }

        return () => {
            element?.classList.remove('p-ripple');
        };
    }, []);

    return elementRef;
};
