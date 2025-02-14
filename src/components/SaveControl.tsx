import { memo, useContext, useEffect, useState } from "react";
import { GameStateContext } from "../contexts/GameStateContext";

export const SaveControl = memo(() => {
    const { size, grid, items, itemPlacement, setSize, setGrid, setItems, setItemPlacement } = useContext(GameStateContext);
    const [hasSavedState, setHasSavedState] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [showLoadSuccess, setShowLoadSuccess] = useState(false);
    const [showImportSuccess, setShowImportSuccess] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('predictionBingoState');
        setHasSavedState(!!savedState);
    }, []);

    const handleSave = () => {
        const existingSave = localStorage.getItem('predictionBingoState');
        if (existingSave) {
            const confirmSave = window.confirm(
                'There is already a saved state. Do you want to overwrite it?'
            );
            if (!confirmSave) return;
        }

        const gameState = {
            size,
            items,
            itemPlacement,
            grid,
            savedAt: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('predictionBingoState', JSON.stringify(gameState));
            setHasSavedState(true);
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    };

    const handleLoad = () => {
        if (items.length > 0) {
            const confirmLoad = window.confirm(
                'Loading a save will override your current items and grid state. Are you sure you want to continue?'
            );
            if (!confirmLoad) return;
        }

        const savedState = localStorage.getItem('predictionBingoState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            setSize(gameState.size);
            setGrid(gameState.grid);
            setItems(gameState.items);
            setItemPlacement(gameState.itemPlacement);
            setShowLoadSuccess(true);
            setTimeout(() => setShowLoadSuccess(false), 2000);
        }
    };

    const handleExport = () => {
        const gameState = {
            size,
            items,
            itemPlacement,
            grid,
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
                    setGrid(gameState.grid);
                    setItemPlacement(gameState.itemPlacement);
                    setItems(gameState.items);
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
    );
});

SaveControl.displayName = 'SaveControl';