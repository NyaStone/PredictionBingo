import { GameStateProvider } from "./GameStateContext";
import { ItemsContextProvider } from "./ItemsContext";

export function ContextsProvider({children}: {children: React.ReactNode}) {
    return (
        <GameStateProvider>
                {children}
        </GameStateProvider>
    );
}