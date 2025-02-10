import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { SizeContext } from "../contexts/SizeContext";

export function ItemList() {
    const [size] = useContext(SizeContext);
    const [items, setItems] = useContext(ItemsContext);
    const [newItem, setNewItem] = useState("");
    const [showMobileList, setShowMobileList] = useState(true);

    const isListFull = items.length >= size * size;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() && !isListFull) {
            setItems([...items, newItem.trim()]);
            setNewItem("");
        }
    };

    const handleDelete = (indexToDelete: number) => {
        setItems(items.filter((_, index) => index !== indexToDelete));
    };

    const ItemCard = ({ item, index }: { item: string, index: number }) => (
        <div 
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
    );

    return (
        <div className="bg-gray-700 p-6 rounded-xl mb-8">
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        disabled={isListFull}
                        className={`flex-1 bg-gray-800 text-gray-200 p-2 rounded-lg
                                 border border-gray-600 focus:border-indigo-500
                                 focus:outline-none transition-colors
                                 ${isListFull ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder={isListFull ? "List is full" : "Add new item..."}
                    />
                    <button
                        type="submit"
                        disabled={isListFull}
                        className={`bg-indigo-600 text-white px-4 py-2 rounded-lg
                                 transition-colors
                                 ${isListFull 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-indigo-700'}`}
                    >
                        Add
                    </button>
                </div>
            </form>
            
            <div className="block md:hidden">
                <button
                    onClick={() => setShowMobileList(!showMobileList)}
                    className="w-full mb-4 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg
                             border border-gray-600 hover:border-indigo-500
                             transition-all duration-200"
                >
                    {showMobileList ? 'Hide List' : 'Show List'}
                </button>
                
                {showMobileList && (
                    <div className="grid grid-cols-1 gap-4">
                        {[...items].reverse().map((item, index) => (
                            <ItemCard key={index} item={item} index={items.length - 1 - index} />
                        ))}
                    </div>
                )}
            </div>
            
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <ItemCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}