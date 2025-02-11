import { useContext, useEffect, useState } from "react";
import { SizeContext } from "../contexts/SizeContext";
import { ItemsContext } from "../contexts/ItemsContext";
import { ItemPlacementContext, shufflePlacement } from "../contexts/ItemPlacementContext";
import { GridContext } from "../contexts/GridContext";

export function Settings() {
    const [size, setSize] = useContext(SizeContext);
    const [items, setItems] = useContext(ItemsContext);
    const [itemPlacement, setItemPlacement] = useContext(ItemPlacementContext);
    const [gridState, setGridState] = useContext(GridContext);
    const [hasSavedState, setHasSavedState] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [showLoadSuccess, setShowLoadSuccess] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showImportSuccess, setShowImportSuccess] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('predictionBingoState');
        setHasSavedState(!!savedState);
    }, []);

    const minSize = Math.ceil(Math.sqrt(items.length));

    const handleDecrease = () => {
        if (size > minSize) {
            setSize(size - 1);
        }
    };

    const handleIncrease = () => {
        setSize(size + 1);
    };

    const handleShuffle = () => {
        setItemPlacement(shufflePlacement(itemPlacement));
    };

    const handleSave = () => {
        const gameState = {
            size,
            items,
            itemPlacement,
            gridState,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('predictionBingoState', JSON.stringify(gameState));
        setHasSavedState(true); // Update state after saving
        
        // Show and hide success message
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 2000);
    };

    const handleLoad = () => {
        const savedState = localStorage.getItem('predictionBingoState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            setSize(gameState.size);
            setItems(gameState.items);
            setItemPlacement(gameState.itemPlacement);
            setGridState(gameState.gridState);
            
            // Show and hide success message
            setShowLoadSuccess(true);
            setTimeout(() => setShowLoadSuccess(false), 2000);
        }
    };

    const handleExport = () => {
        const gameState = {
            size,
            items,
            itemPlacement,
            gridState,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prediction-bingo-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const gameState = JSON.parse(e.target?.result as string);
                    setSize(gameState.size);
                    setItems(gameState.items);
                    setItemPlacement(gameState.itemPlacement);
                    setGridState(gameState.gridState);
                    
                    // Show success message
                    setShowImportSuccess(true);
                    setTimeout(() => setShowImportSuccess(false), 2000);
                } catch (error) {
                    console.error('Failed to parse imported file:', error);
                }
            };
            reader.readAsText(file);
        }
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
                        <label className="text-gray-200">
                            Grid Size (minimum: {minSize})
                        </label>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handleDecrease}
                                disabled={size <= minSize}
                                className={`px-4 py-2 rounded-lg transition-colors
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
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg
                                        hover:bg-indigo-700 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Total cells: {size * size}
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleShuffle}
                            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg
                                    hover:bg-indigo-700 transition-colors"
                        >
                            Shuffle Grid
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Save and Export buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleSave}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg
                                        hover:bg-green-700 transition-colors relative"
                            >
                                Save Grid
                                {showSaveSuccess && (
                                    <span className="absolute inset-0 flex items-center justify-center 
                                                bg-green-500 text-white rounded-lg
                                                animate-fade-out"
                                    >
                                        Saved!
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={handleExport}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg
                                        hover:bg-green-700 transition-colors"
                            >
                                Export as File
                            </button>
                        </div>
                        
                        {/* Load and Import buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            {hasSavedState ? (
                                <>
                                    <button
                                        onClick={handleLoad}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg
                                                hover:bg-blue-700 transition-colors relative"
                                    >
                                        Load Save
                                        {showLoadSuccess && (
                                            <span className="absolute inset-0 flex items-center justify-center 
                                                        bg-blue-500 text-white rounded-lg
                                                        animate-fade-out"
                                            >
                                                Loaded!
                                            </span>
                                        )}
                                    </button>
                                    <label className="w-full relative">
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleImport}
                                            className="hidden"
                                        />
                                        <span className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg
                                                     hover:bg-blue-700 transition-colors cursor-pointer
                                                     text-center">
                                            Import
                                        </span>
                                        {showImportSuccess && (
                                            <span className="absolute inset-0 flex items-center justify-center 
                                                        bg-blue-500 text-white rounded-lg
                                                        animate-fade-out">
                                                Imported!
                                            </span>
                                        )}
                                    </label>
                                </>
                            ) : (
                                <label className="col-span-2 w-full relative">
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleImport}
                                        className="hidden"
                                    />
                                    <span className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg
                                                 hover:bg-blue-700 transition-colors cursor-pointer
                                                 text-center">
                                        Import
                                    </span>
                                    {showImportSuccess && (
                                        <span className="absolute inset-0 flex items-center justify-center 
                                                    bg-blue-500 text-white rounded-lg
                                                    animate-fade-out">
                                            Imported!
                                        </span>
                                    )}
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}