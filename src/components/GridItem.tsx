import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";

export function GridItem({row, column}: {row: number, column: number}) {
    const { 
        items, 
        grid, 
        itemPlacement, 
        setGrid, 
        setSearchTerm, 
        setShowMobileList
    } = useContext(GameStateContext);
    const index = itemPlacement[row][column];
    const item = index < items.length ? items[index] : "";
    const isChecked = grid[row][column];
    const isEmpty = item === "";

    const handleClick = () => {
        if (!isEmpty) {
            const newGridState = grid.map((r, i) =>
                i === row ? r.map((c, j) => 
                    j === column ? !c : c
                ) : r
            );
            setGrid(newGridState);
        }
    };

    const scrollToItem = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isEmpty) {
            // Ensure mobile list is visible and set search term
            setShowMobileList(true);
            setSearchTerm((index + 1).toString());
            
            // Scroll to item after state updates
            requestAnimationFrame(() => {
                const element = document.getElementById(`item-${index}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    };

    return (
        <div className={`rounded-lg shadow-lg aspect-square
                    border border-gray-700 
                    transition-all duration-200
                    overflow-hidden
                    ${isEmpty 
                        ? 'bg-gray-800 cursor-not-allowed opacity-50' 
                        : `${isChecked 
                            ? 'bg-green-300 hover:bg-green-400 text-gray-900' 
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-200'} 
                        cursor-pointer hover:border-indigo-500`
                    }`}
        >
            {/* Desktop view - shows item text and toggles checked state */}
            <button
                onClick={handleClick}
                className="w-full h-full items-center justify-center hidden md:flex">
                <span>{item}</span>
            </button>

            {/* Mobile view - shows item number and scrolls to item in list */}
            <a
                href={`#item-${index}`}
                onClick={scrollToItem}
                className="w-full h-full flex items-center justify-center md:hidden">
                <span>#{index + 1}</span>
            </a>
        </div>
    );
}

GridItem.displayName = 'GridItem';