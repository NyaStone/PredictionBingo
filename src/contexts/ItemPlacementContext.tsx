import { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { SizeContext } from "./SizeContext";

export type ItemPlacementState = number[][];

export const ItemPlacementContext = createContext<[ItemPlacementState, Dispatch<ItemPlacementState>]>([[], () => {}]);

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

    const [itemPlacement, setItemPlacement] = useState<ItemPlacementState>(
        () => generateItemPlacement(size)
    );

    useEffect(() => {
        const newPlacement = generateItemPlacement(size);
        setItemPlacement(newPlacement);
    }, [size]);

    // Add safety check
    if (!itemPlacement || itemPlacement.length !== size) {
        return null; // or a loading state
    }

    return (
        <ItemPlacementContext.Provider value={[itemPlacement, setItemPlacement]}>
            {children}
        </ItemPlacementContext.Provider>
    );
}