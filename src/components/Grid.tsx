
import React from 'react';

interface GridProps {
  items: string[];
  columns?: number;
  itemHeight?: number;
}

const Grid: React.FC<GridProps> = ({ items, columns = 3, itemHeight = 150 }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '20px', 
    justifyItems: 'center',
    alignItems: 'center',
  };

  const itemStyle: React.CSSProperties = {
    height: itemHeight,
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  return (
    <div style={gridStyle}>
      {items.map((item, index) => (
        <div key={index} style={{ overflow: 'hidden' }}>
          <img src={item} alt={`Grid item ${index}`} style={itemStyle} />
        </div>
      ))}
    </div>
  );
};

export default Grid;
