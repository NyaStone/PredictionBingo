import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { SizeContext } from "../contexts/SizeContext";
import { GridContext } from "../contexts/GridContext";

export function GridItem({row, column}: {row: number, column: number}) {
    const [items] = useContext(ItemsContext);
    const [size] = useContext(SizeContext);
    const [gridState, setGridState] = useContext(GridContext);
    const index = row * size + column;
    const item = index < items.length ? items[index] : "Empty";
    const isChecked = gridState[row][column];

    const handleClick = () => {
        const newGridState = gridState.map((r, i) =>
            i === row ? r.map((c, j) => 
                j === column ? !c : c
            ) : r
        );
        setGridState(newGridState);
    };

    return <div 
      onClick={handleClick}
      className={`p-4 rounded-lg shadow-lg aspect-square flex items-center justify-center
                 border border-gray-700 hover:border-indigo-500 
                 transition-all duration-200 cursor-pointer
                 ${isChecked 
                    ? 'bg-green-300 hover:bg-green-400 text-gray-900' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200'}`}
    >
      {item}
    </div>
}