import { memo, useContext } from 'react';
import { GameStateContext } from '../contexts/GameStateContext';
import { GridItem } from './GridItem';

export const Grid = memo(() => {
    const { size, grid } = useContext(GameStateContext);

    return (
        <div className="grid gap-2 mb-4" style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
        }}>
            {grid.map((row, i) => 
                row.map((_, j) => (
                    <GridItem 
                        key={`${i}-${j}`}
                        row={i}
                        column={j}
                    />
                ))
            )}
        </div>
    );
});

Grid.displayName = 'Grid';
