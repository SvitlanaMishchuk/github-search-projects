import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
    const [ debouncedValue, setDebouncedValue ] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearInterval(timeout)
        }
    }, [value, delay])

    return debouncedValue;
}