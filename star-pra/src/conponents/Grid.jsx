import React, { useState } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';
import Konva from 'konva';

const Grid = () => {
  const gridSize = 10;
  const cellSize = 50;

  const [coords, setCoords] = useState([]);
  const [lines, setLines] = useState([]);

  const handleClick = (e) => {
    const newCoords = [...coords, [e.target.x(), e.target.y()]];
    setCoords(newCoords);

    if (newCoords.length === 2) {
      setLines([...lines, newCoords]);
      setCoords([]);
    }
  };

  const grid = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid.push(
        <Circle
          key={`${x},${y}`}
          x={x * cellSize + cellSize / 2}
          y={y * cellSize + cellSize / 2}
          width={cellSize}
          height={cellSize}
          fill="black"
          onClick={handleClick}
        />
      );
    }
  }

  const handleMouseEnter = (e) => {
    const tween = new Konva.Tween({
      node: e.target,
      duration: 0.5,
      scaleX: 1.5,
      scaleY: 1.5,
    });

    tween.play();
  };

  const handleMouseLeave = (e) => {
    const tween = new Konva.Tween({
      node: e.target,
      duration: 0.5,
      scaleX: 1,
      scaleY: 1,
    });

    tween.play();
  };

  return (
    <Stage width={gridSize * cellSize} height={gridSize * cellSize}>
      <Layer>
        {grid}
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.flat()}
            stroke="red"
            tension={0.5}
            lineCap="round"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        {coords.map((coord, i) => (
  i < coords.length - 1 && ( // Only if the next coordinate exists
    <Line
      key={i}
      points={[...coord, ...coords[i + 1]]}
      stroke="blue"
      tension={0.5}
      lineCap="round"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
))}
      </Layer>
    </Stage>
  );
};

export default Grid;
