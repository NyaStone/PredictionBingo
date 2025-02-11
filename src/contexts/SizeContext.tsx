import { createContext, useState } from "react";

type SizeState = [number, React.Dispatch<React.SetStateAction<number>>];

export const SizeContext = createContext<SizeState>([0, () => {}] as SizeState);

export const SizeContextProvider = ({children}: {children: React.ReactNode}) => {
    const sizeState = useState(0);

    return <SizeContext.Provider value={sizeState}>
        {children}
    </SizeContext.Provider>
}