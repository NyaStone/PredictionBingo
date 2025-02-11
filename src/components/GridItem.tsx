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

    const scrollToItem = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isEmpty) {
            const element = document.getElementById(`item-${index}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return <div 
      className={`rounded-lg shadow-lg aspect-square
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
    <div
        onClick={handleClick} 
        className="w-full h-full items-center justify-center hidden md:flex">
        <span>
          {item}
        </span>
    </div>
    <div
        onClick={scrollToItem}
        className="w-full h-full flex items-center justify-center md:hidden">
      <a href={`#item-${index}`}>
          #{index + 1}
        </a>
      </div>
    </div>
}