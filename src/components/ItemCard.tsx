import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { SizeContext } from "../contexts/SizeContext";
import { GridContext } from "../contexts/GridContext";


export const ItemCard = ({ item, index }: { item: string, index: number }) => {
    const [items, setItems] = useContext(ItemsContext);
    const [size] = useContext(SizeContext);
    const [gridState, setGridState] = useContext(GridContext);
    const row = Math.floor(index / size);
    const column = index % size;
    const isChecked = gridState[row][column];

    const handleDelete = (indexToDelete: number) => {
        setItems(items.filter((_, index) => index !== indexToDelete));
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent click from bubbling to parent
        const newGridState = gridState.map((r, i) =>
            i === row ? r.map((c, j) => 
                j === column ? !c : c
            ) : r
        );
        setGridState(newGridState);
    };

    return <div 
        onClick={handleClick}
        className={`p-4 rounded-lg shadow-md relative
                 border border-gray-700 hover:border-indigo-500
                 transition-all duration-200 cursor-pointer
                 ${isChecked 
                    ? 'bg-green-300 hover:bg-green-400 text-gray-900' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200'}`}
    >
        {item}
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
};