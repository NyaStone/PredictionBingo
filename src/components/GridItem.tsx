import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { GridContext } from "../contexts/GridContext";
import { ItemPlacementContext } from "../contexts/ItemPlacementContext";

export function GridItem({row, column}: {row: number, column: number}) {
    const [items] = useContext(ItemsContext);
    const [gridState, setGridState] = useContext(GridContext);
    const [itemPlacement] = useContext(ItemPlacementContext);
    const index = itemPlacement[row][column];
    const item = index < items.length ? items[index] : "";
    const isChecked = gridState[row][column];
    const isEmpty = item === "";

    const handleClick = () => {
        if (!isEmpty) {
            const newGridState = gridState.map((r, i) =>
                i === row ? r.map((c, j) => 
                    j === column ? !c : c
                ) : r
            );
            setGridState(newGridState);
        }
    };

    return <div 
      onClick={handleClick}
      className={`p-4 rounded-lg shadow-lg aspect-square flex items-center justify-center
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
      <span className="hidden md:block text-center w-full">
        {item}
      </span>
      <span className="block md:hidden text-center w-full">
        {index + 1}
      </span>
    </div>
}