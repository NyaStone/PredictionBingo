import { GridContextProvider } from "./GridContext";
import { ItemsContextProvider } from "./ItemsContext";
import { SizeContextProvider } from "./SizeContext";

export function ContextsProvider({children}: {children: React.ReactNode}) {
    return <>
        <SizeContextProvider>
            <GridContextProvider>
                <ItemsContextProvider>
                    {children}
                </ItemsContextProvider>
            </GridContextProvider>
        </SizeContextProvider>
    </>
}