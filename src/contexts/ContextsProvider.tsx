import { GridContextProvider } from "./GridContext";
import { ItemPlacementContextProvider } from "./ItemPlacementContext";
import { ItemsContextProvider } from "./ItemsContext";
import { SizeContextProvider } from "./SizeContext";

export function ContextsProvider({children}: {children: React.ReactNode}) {
    return <>
        <SizeContextProvider>
            <GridContextProvider>
                <ItemsContextProvider>
                    <ItemPlacementContextProvider>
                        {children}
                    </ItemPlacementContextProvider>
                </ItemsContextProvider>
            </GridContextProvider>
        </SizeContextProvider>
    </>
}