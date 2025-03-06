import React from 'react'

export default function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) {
    const timeoutRef = React.useRef<number | undefined>(undefined)

    const debouncedFunction = React.useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = window.setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return debouncedFunction
}
