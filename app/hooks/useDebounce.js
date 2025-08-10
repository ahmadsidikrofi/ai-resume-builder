import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 250) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return clearTimeout(handler)
    }, [delay, value])

    return debounceValue
}