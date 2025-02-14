import { createContext, ReactNode, useContext, useState, useEffect, useRef, useCallback } from "react";
import { SizeContext } from "./SizeContext";

type GridState = [GridContextType, (newState: GridContextType) => void]

export type GridContextType = boolean[][];

export const GridContext = createContext<GridState>([[], () => {}] as GridState);

function generateGrid(size: number): GridContextType {
    return Array(size).fill(null)
        .map(() => Array(size).fill(false));
}

export const GridContextProvider = ({children}: {children?: ReactNode}) => {
    const [size] = useContext(SizeContext);
    const gridStateRef = useRef<GridContextType>(generateGrid(size));
    const [, forceUpdate] = useState({});

    const setGridState = useCallback((newState: GridContextType) => {
        gridStateRef.current = newState;
        forceUpdate({});
    }, []);

    useEffect(() => {
        gridStateRef.current = generateGrid(size);
        forceUpdate({});
    }, [size]);

    return (
        <GridContext.Provider value={[gridStateRef.current, setGridState]}>
            {children}
        </GridContext.Provider>
    );
};