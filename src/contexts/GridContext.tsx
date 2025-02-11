import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { SizeContext } from "./SizeContext";

type GridState = [GridContextType, React.Dispatch<React.SetStateAction<GridContextType>>]

export type GridContextType = boolean[][];

export const GridContext = createContext<GridState>([[], () => {}] as GridState);

function generateGrid(size: number): GridContextType {
    return Array(size).fill(null)
        .map(() => Array(size).fill(false));
}

export const GridContextProvider = ({children}: {children?: ReactNode}) => {
    const [size] = useContext(SizeContext);
    const [gridState, setGridState] = useState<GridContextType>(generateGrid(size));

    useEffect(() => {
        setGridState(generateGrid(size));
    }, [size]);

    return <GridContext.Provider value={[gridState, setGridState]}>
        {children}
    </GridContext.Provider>;
}