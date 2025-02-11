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
    function generateItemPlacement(size: number): number[][] {
        let index = 0;
        const newPlacement: number[][] = [];
        for (let i = 0; i < size; i++) {
            newPlacement.push([]);
            for (let j = 0; j < size; j++) {
                newPlacement[i].push(index++);
            }
        }
        return shufflePlacement(newPlacement);
    }
    
    const [size] = useContext(SizeContext);
    const [itemPlacement, setItemPlacement] = useState<ItemPlacementState>(generateItemPlacement(size));

    useEffect(() => {
        setItemPlacement(generateItemPlacement(size));
    }, [size]);


    return (
        <ItemPlacementContext.Provider value={[itemPlacement, setItemPlacement]}>
            {children}
        </ItemPlacementContext.Provider>
    );
}