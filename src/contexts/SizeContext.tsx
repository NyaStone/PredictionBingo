import { createContext, useRef, useCallback, useState } from "react";

type SizeState = [number, (newSize: number) => void];

export const SizeContext = createContext<SizeState>([0, () => {}] as SizeState);

export const SizeContextProvider = ({children}: {children: React.ReactNode}) => {
    const sizeRef = useRef<number>(5);
    const [, forceUpdate] = useState({});

    const setSize = useCallback((newSize: number) => {
        sizeRef.current = newSize;
        forceUpdate({});
    }, []);

    return (
        <SizeContext.Provider value={[sizeRef.current, setSize]}>
            {children}
        </SizeContext.Provider>
    );
};