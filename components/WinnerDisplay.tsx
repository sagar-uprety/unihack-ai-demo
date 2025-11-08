
import React from 'react';
import LegoBrick from './LegoBrick';
import Confetti from './Confetti';

interface WinnerDisplayProps {
  winner: {
    id: number;
    name: string;
    color: string;
  };
  onReset: () => void;
  onNewRaffle: () => void;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, onReset, onNewRaffle }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Confetti />
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border-4 border-yellow-400 text-center relative animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl text-gray-700 tracking-wider">The winner is...</h2>
        <div className="my-8 flex justify-center scale-125">
          <LegoBrick name={winner.name} color={winner.color} isHighlighted={true} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReset}
            className="text-white text-2xl tracking-wider py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform active:translate-y-1 bg-blue-600 border-b-8 border-blue-800 hover:bg-blue-500"
          >
            Draw Again
          </button>
          <button
            onClick={onNewRaffle}
            className="text-white text-2xl tracking-wider py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform active:translate-y-1 bg-green-600 border-b-8 border-green-800 hover:bg-green-500"
          >
            New Raffle
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WinnerDisplay;
