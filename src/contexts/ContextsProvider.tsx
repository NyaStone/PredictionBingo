import { GridContextProvider } from "./GridContext";
import { SizeContextProvider } from "./SizeContext";

export function ContextsProvider({children}: {children: React.ReactNode}) {
    return <>
        <SizeContextProvider>
            <GridContextProvider>
                {children}
            </GridContextProvider>
        </SizeContextProvider>
    </>
}