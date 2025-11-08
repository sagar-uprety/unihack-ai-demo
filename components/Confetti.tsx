
import React, { useEffect, useState } from 'react';
import { LEGO_COLORS } from '../constants';

const CONFETTI_COUNT = 150;

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
  shape: 'rect' | 'circle';
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
      const size = Math.random() * 10 + 5;
      const duration = Math.random() * 3 + 4; // 4s to 7s
      const delay = Math.random() * 2;
      const x = Math.random() * 100;
      const rotation = Math.random() * 360;
      
      return {
        id: index,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        style: {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: LEGO_COLORS[Math.floor(Math.random() * LEGO_COLORS.length)],
          left: `${x}vw`,
          top: `${-size-10}px`,
          animation: `fall ${duration}s linear ${delay}s forwards`,
          transform: `rotate(${rotation}deg)`,
        },
      };
    });
    setPieces(newPieces);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
      {pieces.map(piece => (
        <div key={piece.id} style={piece.style} className={`absolute ${piece.shape === 'circle' ? 'rounded-full' : ''}`} />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
