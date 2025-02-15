import { createContext, useRef, useCallback, useState, ReactNode } from "react";
import { shufflePlacement } from "./ItemPlacementContext";

type GameState = {
  size: number;
  grid: boolean[][];
  items: string[];
  itemPlacement: number[][];
  searchTerm: string;
  showMobileList: boolean;
  showOnlyGridItems: boolean;
  setSize: (size: number) => void;
  setGrid: (grid: boolean[][]) => void;
  setItems: (items: string[]) => void;
  setItemPlacement: (placement: number[][]) => void;
  setSearchTerm: (term: string) => void;
  setShowMobileList: (show: boolean) => void;
  setShowOnlyGridItems: (value: boolean) => void;
};

export const GameStateContext = createContext<GameState>({} as GameState);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const stateRef = useRef({
    size: 5,
    items: [] as string[],
    grid: Array(5).fill(null).map(() => Array(5).fill(false)),
    itemPlacement: shufflePlacement(Array(5).fill(null).map((_, i) => 
      Array(5).fill(0).map((_, j) => i * 5 + j)
    )),
    searchTerm: "",
    showMobileList: true,
  });
  const [, forceUpdate] = useState({});
  const [showOnlyGridItems, setShowOnlyGridItems] = useState(true);

  const setSize = useCallback((newSize: number) => {
    stateRef.current = {
      ...stateRef.current,
      size: newSize,
      grid: Array(newSize).fill(null).map(() => Array(newSize).fill(false)),
      itemPlacement: shufflePlacement(Array(newSize).fill(null).map((_, i) => 
        Array(newSize).fill(0).map((_, j) => i * newSize + j)
      ))
    };
    forceUpdate({});
  }, []);

  const setGrid = useCallback((newGrid: boolean[][]) => {
    stateRef.current.grid = newGrid;
    forceUpdate({});
  }, []);

  const setItems = useCallback((newItems: string[]) => {
    stateRef.current.items = newItems;
    forceUpdate({});
  }, []);

  const setItemPlacement = useCallback((newPlacement: number[][]) => {
    stateRef.current.itemPlacement = newPlacement;
    forceUpdate({});
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    stateRef.current.searchTerm = term;
    forceUpdate({});
  }, []);

  const setShowMobileList = useCallback((show: boolean) => {
    stateRef.current.showMobileList = show;
    forceUpdate({});
  }, []);

  return (
    <GameStateContext.Provider value={{
      size: stateRef.current.size,
      grid: stateRef.current.grid,
      items: stateRef.current.items,
      itemPlacement: stateRef.current.itemPlacement,
      searchTerm: stateRef.current.searchTerm,
      showMobileList: stateRef.current.showMobileList,
      showOnlyGridItems,
      setSize,
      setGrid,
      setItems,
      setItemPlacement,
      setSearchTerm,
      setShowMobileList,
      setShowOnlyGridItems,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};