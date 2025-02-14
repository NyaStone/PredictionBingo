import { createContext, useContext, useEffect, useRef, useCallback, useState } from "react";
import { SizeContext } from "./SizeContext";

export type ItemPlacementState = number[][];

export const ItemPlacementContext = createContext<[ItemPlacementState, (newState: ItemPlacementState) => void]>([[], () => {}]);

export function shufflePlacement(placement: number[][]): number[][] {
    const newPlacement = placement.map((row) => [...row]);
    for (let i = newPlacement.length - 1; i > 0; i--) {
        for (let j = newPlacement[i].length - 1; j > 0; j--) {
            const x = Math.floor(Math.random() * (i + 1));
            const y = Math.floor(Math.random() * (j + 1));
            const temp = newPlacement[i][j];
            newPlacement[i][j] = newPlacement[x][y];
            newPlacement[x][y] = temp;
        }
    }
    return newPlacement;
}

export const ItemPlacementContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [size] = useContext(SizeContext);
    const itemPlacementRef = useRef<ItemPlacementState>(generateItemPlacement(size));
    const [, forceUpdate] = useState({});

    const setItemPlacement = useCallback((newState: ItemPlacementState) => {
        itemPlacementRef.current = newState;
        forceUpdate({});
    }, []);

    function generateItemPlacement(size: number): number[][] {
        const newPlacement: number[][] = Array(size).fill(null)
            .map(() => Array(size).fill(0));
        
        // Fill with sequential indices
        let index = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newPlacement[i][j] = index++;
            }
        }
        return shufflePlacement(newPlacement);
    }

    useEffect(() => {
        itemPlacementRef.current = generateItemPlacement(size);
        forceUpdate({});
    }, [size]);

    // Add safety check
    if (!itemPlacementRef.current || itemPlacementRef.current.length !== size) {
        return null;
    }

    return (
        <ItemPlacementContext.Provider value={[itemPlacementRef.current, setItemPlacement]}>
            {children}
        </ItemPlacementContext.Provider>
    );
}