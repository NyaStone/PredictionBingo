import { GameStateProvider } from "./GameStateContext";

export function ContextsProvider({children}: {children: React.ReactNode}) {
    return (
        <GameStateProvider>
                {children}
        </GameStateProvider>
    );
}