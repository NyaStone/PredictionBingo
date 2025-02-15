import { memo, useContext, useState, useEffect } from "react";
import { GameStateContext } from "../contexts/GameStateContext";

type Template = {
    name: string;
    size: number;
    items: string[];
    itemPlacement: number[][];
    grid: boolean[][];
    randomize?: boolean;  // Add the optional randomize flag
};

export const TemplateControl = memo(() => {
    const { items, setSize, setGrid, setItems, setItemPlacement } = useContext(GameStateContext);
    const [showLoadSuccess, setShowLoadSuccess] = useState(false);
    const [templates, setTemplates] = useState<{id: string, name: string}[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');

    useEffect(() => {
        // Get all JSON files from the templates directory
        const templateFiles = import.meta.glob('/public/templates/*.json');
        const templatesList = Object.keys(templateFiles).map(file => ({
            id: file.replace('/public/templates/', ''),
            name: file.replace('/public/templates/', '')
                     .replace('.json', '')
                     .replace(/-/g, ' ')
        }));
        
        setTemplates(templatesList);
        if (templatesList.length > 0) {
            setSelectedTemplate(templatesList[0].id);
        }
    }, []);

    const randomizeState = (template: Template) => {
        // Randomize items if flag is present
        const randomizedItems = template.randomize 
            ? [...template.items].sort(() => Math.random() - 0.5)
            : template.items;

        // Create and randomize grid positions if flag is present
        const positions = [];
        for (let i = 0; i < template.size; i++) {
            for (let j = 0; j < template.size; j++) {
                positions.push(template.itemPlacement[i][j]);
            }
        }
        
        const randomizedPositions = template.randomize
            ? [...positions].sort(() => Math.random() - 0.5)
            : positions;

        // Reconstruct the grid
        const newPlacement = Array(template.size).fill(null).map((_, i) =>
            Array(template.size).fill(null).map((_, j) => 
                randomizedPositions[i * template.size + j]
            )
        );

        return {
            items: randomizedItems,
            itemPlacement: newPlacement
        };
    };

    const handleLoadTemplate = async () => {
        if (items.length > 0) {
            const confirmLoad = window.confirm(
                'Loading a template will override your current items and grid state. Are you sure you want to continue?'
            );
            if (!confirmLoad) return;
        }

        try {
            const response = await fetch(`/templates/${selectedTemplate}`);
            if (!response.ok) throw new Error('Failed to load template');
            
            const template: Template = await response.json();
            const { items: randomizedItems, itemPlacement: randomizedPlacement } = randomizeState(template);
            
            setItems(randomizedItems);
            setSize(template.size);
            setGrid(template.grid);
            setItemPlacement(randomizedPlacement);
            
            setShowLoadSuccess(true);
            setTimeout(() => setShowLoadSuccess(false), 2000);
        } catch (error) {
            console.error('Failed to load template:', error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-gray-200">Templates</label>
            <div className="grid grid-cols-[1fr,auto] md:grid-cols-[1fr,200px] gap-2">
                <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg
                             border border-gray-600 hover:border-purple-500
                             focus:outline-none focus:border-purple-500
                             transition-colors"
                >
                    {templates.map(template => (
                        <option key={template.id} value={template.id}>
                            {template.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleLoadTemplate}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg
                             hover:bg-purple-700 transition-colors relative"
                >
                    Load
                    {showLoadSuccess && (
                        <span className="absolute inset-0 flex items-center justify-center 
                                    bg-purple-500 text-white rounded-lg
                                    animate-fade-out"
                        >
                            Loaded!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
});

TemplateControl.displayName = 'TemplateControl';