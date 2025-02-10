import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";


export const ItemCard = ({ item, index }: { item: string, index: number }) => {
    const [items, setItems] = useContext(ItemsContext);

    const handleDelete = (indexToDelete: number) => {
        setItems(items.filter((_, index) => index !== indexToDelete));
    };
    

    return <div 
        className="bg-gray-800 p-4 rounded-lg shadow-md
                 border border-gray-700 hover:border-indigo-500
                 transition-all duration-200 hover:bg-gray-700
                 text-gray-200 relative"
    >
        {item}
        <button
            onClick={() => handleDelete(index)}
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