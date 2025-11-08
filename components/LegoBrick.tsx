
import React from 'react';

interface LegoBrickProps {
  name: string;
  color: string;
  isHighlighted?: boolean;
}

const LegoBrick: React.FC<LegoBrickProps> = ({ name, color, isHighlighted = false }) => {
  const studColor = `rgba(255, 255, 255, 0.4)`;

  const brickClasses = `
    relative w-40 h-24 rounded-md p-2 flex items-center justify-center text-center
    shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2)]
    transition-all duration-200 ease-in-out
    ${isHighlighted ? 'transform scale-110 shadow-2xl ring-4 ring-yellow-400' : 'shadow-md'}
  `;
  
  return (
    <div style={{ backgroundColor: color }} className={brickClasses}>
      {/* Lego Studs */}
      <div className="absolute top-2 left-2 w-6 h-6 rounded-full" style={{ boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.2)`, backgroundColor: studColor }}></div>
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full" style={{ boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.2)`, backgroundColor: studColor }}></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full" style={{ boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.2)`, backgroundColor: studColor }}></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full" style={{ boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.2)`, backgroundColor: studColor }}></div>
      
      <span className="text-white text-lg font-bold z-10 break-words drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] px-1">
        {name}
      </span>
    </div>
  );
};

export default LegoBrick;
