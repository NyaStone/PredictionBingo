import { memo, useContext, useState } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import { SaveControl } from "./SaveControl";
import { TemplateControl } from "./TemplateControl";

export const Settings = memo(() => {
    const { size, items, setSize, setItems, itemPlacement, setItemPlacement, showOnlyGridItems, setShowOnlyGridItems } = useContext(GameStateContext);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const minSize = 3;

    const handleDecrease = () => {
        if (size > minSize) {
            setSize(size - 1);
        }
    };

    const handleIncrease = () => {
        setSize(size + 1);
    };

    const handleShuffleGrid = () => {
        // Create a flat array of all positions
        const positions = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                positions.push(itemPlacement[i][j]);
            }
        }

        // Shuffle the flat array
        const shuffled = [...positions].sort(() => Math.random() - 0.5);

        // Reconstruct the 2D array
        const newPlacement = Array(size).fill(null).map((_, i) =>
            Array(size).fill(null).map((_, j) => shuffled[i * size + j])
        );

        setItemPlacement(newPlacement);
    };

    const handleShuffleItems = () => {
        setItems([...items].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="w-full px-4 mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-gray-700 rounded-xl mb-8">
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full py-4 px-6 flex items-center justify-between text-gray-200 hover:text-white transition-colors"
            >
                <span className="text-xl font-bold">Settings</span>
                <span className={`transform transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}>
                    ▼
                </span>
            </button>

            <div className={`overflow-hidden transition-all duration-200 ${isCollapsed ? 'h-0' : 'h-auto px-6 pb-8'}`}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-200 text-center md:text-left">
                            Grid Size (minimum: {minSize})
                        </label>
                        <div className="flex flex-col md:flex-row md:gap-12 gap-4 items-center">
                            <div className="flex gap-4 items-center justify-center w-full md:w-auto">
                                <button
                                    onClick={handleDecrease}
                                    disabled={size <= minSize}
                                    className={`px-6 py-2 rounded-lg transition-colors
                                            ${size <= minSize 
                                                ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                                                : 'bg-indigo-600 hover:bg-indigo-700'} 
                                            text-white`}
                                >
                                    -
                                </button>
                                <span className="text-gray-200 text-xl font-bold w-12 text-center">
                                    {size}
                                </span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                                            hover:bg-indigo-700 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex flex-row md:flex-row gap-2 w-full md:flex-1">
                                <button
                                    onClick={handleShuffleGrid}
                                    className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg
                                            hover:bg-indigo-700 transition-colors max-w-[232px] md:max-w-none mx-auto md:mx-0"
                                >
                                    Shuffle Grid
                                </button>
                                <button
                                    onClick={handleShuffleItems}
                                    className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg
                                            hover:bg-indigo-700 transition-colors max-w-[232px] md:max-w-none mx-auto md:mx-0"
                                >
                                    Shuffle Items
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            Total cells: {size * size}
                        </p>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <input
                            type="checkbox"
                            id="hideExcessItems"
                            checked={showOnlyGridItems}
                            onChange={(e) => setShowOnlyGridItems(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-600 rounded
                                     focus:ring-indigo-500 focus:ring-2 bg-gray-800"
                        />
                        <label htmlFor="hideExcessItems" className="text-gray-200">
                            Hide Excess Items
                        </label>
                    </div>

                    <TemplateControl />
                    <SaveControl />
                </div>
            </div>
        </div>
    );
});

Settings.displayName = 'Settings';