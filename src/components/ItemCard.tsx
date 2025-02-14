import { memo, useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";

export const ItemCard = memo(({ item, index }: { item: string, index: number }) => {
    const { size, grid, items, itemPlacement, setGrid, setItems } = useContext(GameStateContext);
    
    // Find row and column by searching through itemPlacement
    let row = -1;
    let column = -1;
    
    // Search for the index in the itemPlacement array
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (itemPlacement[i][j] === index) {
                row = i;
                column = j;
                break;
            }
        }
        if (row !== -1) break;
    }

    const isChecked = row !== -1 && column !== -1 ? grid[row][column] : false;

    const handleDelete = (indexToDelete: number) => {
        // Update items list
        setItems(items.filter((_, index) => index !== indexToDelete));
        
        // Update grid state if item was found in the grid
        if (row !== -1 && column !== -1) {
            const newGridState = grid.map((r, i) => 
                i === row ? r.map((c, j) => 
                    j === column ? false : c
                ) : r
            );
            setGrid(newGridState);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (row !== -1 && column !== -1) {
            const newGridState = grid.map((r, i) =>
                i === row ? r.map((c, j) => 
                    j === column ? !c : c
                ) : r
            );
            setGrid(newGridState);
        }
    };

    return <div 
        id={`item-${index}`}
        onClick={handleClick}
        className={`p-4 rounded-lg shadow-md relative
                 border border-gray-700 hover:border-indigo-500
                 transition-all duration-200 cursor-pointer
                 ${isChecked 
                    ? 'bg-green-300 hover:bg-green-400 text-gray-900' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200'}`}
    >
        <div className="hidden md:block">
            {item}
        </div>
        <div className="block md:hidden">
            <span className="font-bold">#{index + 1}</span> {item}
        </div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
            }}
            className="absolute top-2 right-2 w-6 h-6
                     flex items-center justify-center
                     rounded-full bg-gray-700 hover:bg-red-600
                     text-gray-300 hover:text-white
                     transition-colors"
            aria-label="Delete item"
        >
            ×
        </button>
    </div>
});