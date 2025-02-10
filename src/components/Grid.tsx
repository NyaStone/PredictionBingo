import { useContext } from "react";
import { SizeContext } from "../contexts/SizeContext";

function Grid() {
  const [size] = useContext(SizeContext);
  const gridItems = Array(size * size).fill(null).map((_, index) => (
    <div 
      key={index} 
      className="bg-gray-800 p-4 rounded-lg shadow-lg aspect-square flex items-center justify-center
                 text-gray-200 border border-gray-700 hover:border-indigo-500 
                 transition-all duration-200 hover:bg-gray-700 cursor-pointer"
    >
      {index + 1}
    </div>
  ));

  return (
    <div className="container mx-auto p-8">
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
