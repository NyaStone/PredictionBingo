import { useContext } from "react";
import { SizeContext } from "../contexts/SizeContext";
import { ItemsContext } from "../contexts/ItemsContext";

export function Settings() {
    const [size, setSize] = useContext(SizeContext);
    const [items, setItems] = useContext(ItemsContext);

    const minSize = Math.ceil(Math.sqrt(items.length));

    const handleDecrease = () => {
        if (size > minSize) {
            setSize(size - 1);
        }
    };

    const handleIncrease = () => {
        setSize(size + 1);
    };

    return (
        <div className="w-full px-4 mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-gray-700 py-8 rounded-xl mb-8">
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
            </div>
        </div>
    );
}