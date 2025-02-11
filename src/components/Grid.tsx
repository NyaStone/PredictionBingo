import { useContext } from "react";
import { SizeContext } from "../contexts/SizeContext";
import { GridItem } from "./GridItem";

function Grid() {
  const [size] = useContext(SizeContext);
  const gridItems = Array(size * size).fill(null).map((_, index) => (<GridItem key={index} row={Math.floor(index / size)} column={index % size} />));

  return (
    <div className="container mx-auto p-8 bg-gray-700 rounded-xl mb-8">
      <div 
        className="grid gap-4" 
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
        }}
      >
        {gridItems}
      </div>
    </div>
  );
}

export default Grid;
