import { createContext, ReactNode, useContext, useState } from "react";
import { SizeContext } from "./SizeContext";

type GridState = [GridContextType, React.Dispatch<React.SetStateAction<GridContextType>>]

export type GridContextType = boolean[][];

export const GridContext = createContext<GridState>([[], () => {}] as GridState);

export const GridContextProvider = ({children}: {children?: ReactNode}) => {
    const [size] = useContext(SizeContext);
    const initialGrid = [];
    for (let i = 0; i < size; i++)
        initialGrid.push(Array(size).fill(false));
    const gridState = useState<GridContextType>(initialGrid);

    return <GridContext.Provider value={gridState}>
        {children}
    </GridContext.Provider>;
}