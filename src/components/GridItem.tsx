import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { SizeContext } from "../contexts/SizeContext";

export function GridItem({row, column}: {row: number, column: number}) {
    const [items] = useContext(ItemsContext);
    const [size] = useContext(SizeContext);
    const index = row * size + column;
    const item = index < items.length ? items[index] : "Empty";

    return <div 
      className="bg-gray-800 p-4 rounded-lg shadow-lg aspect-square flex items-center justify-center
                 text-gray-200 border border-gray-700 hover:border-indigo-500 
                 transition-all duration-200 hover:bg-gray-700 cursor-pointer"
    >
      {item}
    </div>
}