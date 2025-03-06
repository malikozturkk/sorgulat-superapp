export const handleClickOutside = (
    event: MouseEvent,
    divRef: React.RefObject<HTMLDivElement | null>,
    buttonRef: React.RefObject<HTMLButtonElement | HTMLInputElement | null> | null,
    setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const target = event.target as Node
    if (
        divRef.current &&
        !divRef.current.contains(target) &&
        (!buttonRef || (buttonRef.current && !buttonRef.current.contains(target)))
    ) {
        setState(false)
    }
}
