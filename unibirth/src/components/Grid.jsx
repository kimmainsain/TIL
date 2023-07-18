import React, { useState } from 'react';
import { Stage, Layer, Line, RegularPolygon } from 'react-konva';
import Konva from 'konva';

const SideLength = 20;
const h = Math.sqrt(3) / 2 * SideLength;

function getRandomColor() {
  return Konva.Util.getRandomColor();
}

const App = () => {
  const [colors, setColors] = useState(Array(400).fill('transparent'));
  const [selectedHexes, setSelectedHexes] = useState([]);
  const [lines, setLines] = useState([]);

  const handleHexClick = (index, coords) => {
    console.log(index, coords);
    const newColors = [...colors];
    newColors[index] = getRandomColor();
    setColors(newColors);

    if (selectedHexes.length === 2) {
      setLines([...lines, selectedHexes]);
      setSelectedHexes([coords]);
    } else {
      setSelectedHexes([...selectedHexes, coords]);
    }
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {Array(20)
          .fill(0)
          .map((row, i) => {
            return Array(20)
              .fill(0)
              .map((cell, j) => {
                const x = (j + 0.5 * (i % 2)) * (3 * SideLength / 2);
                const y = i * h;
                return (
                  <RegularPolygon
                    key={`${i}-${j}`}
                    x={x}
                    y={y}
                    sides={6}
                    radius={SideLength}
                    fill={colors[i * 20 + j]}
                    stroke="black"
                    strokeWidth={1}
                    onClick={() => handleHexClick(i * 20 + j, [x, y])}
                    onTap={() => handleHexClick(i * 20 + j, [x, y])}
                  />
                );
              });
          })}
        {lines.map((line, index) => (
          <Line
            key={index}
            points={[line[0][0], line[0][1], line[1][0], line[1][1]]}
            stroke="yellow"
            strokeWidth={4}
            tension={1}
          />
        ))}
        {selectedHexes.length === 2 && (
          <Line
            points={[selectedHexes[0][0], selectedHexes[0][1], selectedHexes[1][0], selectedHexes[1][1]]}
            stroke="yellow"
            strokeWidth={4}
            tension={1}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default App;
