import { createContext, useState } from "react";

type ItemsState = [string[], React.Dispatch<React.SetStateAction<string[]>>]


export const ItemsContext = createContext<ItemsState>([[], () => {}] as ItemsState);

export const ItemsContextProvider = ({children}: {children: React.ReactNode}) => {
    const defaultItems: string[] = [];
    const itemsState = useState(defaultItems);

    return <ItemsContext.Provider value={itemsState}>
        {children}
    </ItemsContext.Provider>
}