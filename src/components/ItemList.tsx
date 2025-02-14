import { memo, useContext, useState } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import { ItemCard } from "./ItemCard";

export const ItemList = memo(() => {
    const { size, items, setItems, searchTerm, setSearchTerm } = useContext(GameStateContext);
    const [newItem, setNewItem] = useState("");
    const [showMobileList, setShowMobileList] = useState(true);

    const isListFull = items.length >= size * size;
    const isFiltering = searchTerm.trim().length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() && !isListFull) {
            setItems([...items, newItem.trim()]);
            setNewItem("");
        }
    };

    const filterItems = (items: string[]) => {
        const trimmedSearch = searchTerm.trim().toLowerCase();
        return items.filter((item, index) => {
            const matchesText = item.toLowerCase().includes(trimmedSearch);
            const matchesIndex = (index + 1).toString() === trimmedSearch;
            return matchesText || matchesIndex;
        });
    };

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
                <div className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-gray-700 text-gray-200 p-2 rounded-lg
                                     border border-gray-500 focus:border-indigo-500
                                     focus:outline-none transition-colors"
                            placeholder="Search by text or number..."
                        />
                        <button
                            onClick={() => setSearchTerm("")}
                            className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg
                                     border border-gray-600 hover:border-indigo-500
                                     transition-all duration-200"
                            type="button"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {!isFiltering && (
                    <button
                        onClick={() => setShowMobileList(!showMobileList)}
                        className="w-full mb-4 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg
                                 border border-gray-600 hover:border-indigo-500
                                 transition-all duration-200"
                    >
                        {showMobileList ? 'Hide List' : 'Show List'}
                    </button>
                )}
                
                {(showMobileList || isFiltering) && (
                    <div className="grid grid-cols-1 gap-4">
                        {filterItems([...items]).reverse().map((item, index) => (
                            <ItemCard 
                                key={index} 
                                item={item} 
                                index={items.indexOf(item)} 
                            />
                        ))}
                    </div>
                )}
            </div>
            
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterItems(items).map((item, index) => (
                    <ItemCard 
                        key={index} 
                        item={item} 
                        index={items.indexOf(item)} 
                    />
                ))}
            </div>
        </div>
    );
});

ItemList.displayName = 'ItemList';