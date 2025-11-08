
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import LegoBrick from './components/LegoBrick';
import WinnerDisplay from './components/WinnerDisplay';
import { LEGO_COLORS } from './constants';

type Participant = {
  id: number;
  name: string;
  color: string;
};

enum GameState {
  IDLE,
  RAFFLING,
  FINISHED,
}

const App: React.FC = () => {
  const [participantsText, setParticipantsText] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const parsedParticipants = useMemo(() => {
    return participantsText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
  }, [participantsText]);

  const handleStartRaffle = () => {
    if (parsedParticipants.length < 2) {
      setError('Please enter at least two participants.');
      return;
    }
    setError('');
    const participantData = parsedParticipants.map((name, index) => ({
      id: index,
      name,
      color: LEGO_COLORS[index % LEGO_COLORS.length],
    }));
    setParticipants(participantData);
    setGameState(GameState.RAFFLING);
    setWinner(null);
    setHighlightedIndex(0);
  };

  const handleReset = () => {
    setGameState(GameState.IDLE);
    setWinner(null);
    setParticipants([]);
    setHighlightedIndex(null);
    // Keep participantsText so user can draw again with the same list
  };
  
  const handleNewRaffle = () => {
    handleReset();
    setParticipantsText('');
  }

  const runRaffle = useCallback(() => {
    const totalParticipants = participants.length;
    const totalDuration = 5000; // 5 seconds total
    const shuffleInterval = 75; // initial interval
    
    let startTime = Date.now();
    let currentInterval = shuffleInterval;
    // In a browser environment, `setTimeout` returns a `number`, not a `NodeJS.Timeout`.
    let timeoutId: number;

    const shuffle = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= totalDuration) {
        const winnerIndex = Math.floor(Math.random() * totalParticipants);
        setHighlightedIndex(winnerIndex);
        setTimeout(() => {
          setWinner(participants[winnerIndex]);
          setGameState(GameState.FINISHED);
        }, 1000);
        return;
      }
      
      setHighlightedIndex(prev => (prev! + 1) % totalParticipants);
      
      // Slow down effect
      const progress = elapsedTime / totalDuration;
      currentInterval = shuffleInterval + (progress * progress * 500);

      timeoutId = setTimeout(shuffle, currentInterval);
    };

    shuffle();
    
    return () => clearTimeout(timeoutId);
  }, [participants]);

  useEffect(() => {
    if (gameState === GameState.RAFFLING && participants.length > 0) {
      const stopRaffle = runRaffle();
      return stopRaffle;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, runRaffle]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.RAFFLING:
        return (
          <div className="w-full max-w-4xl p-4 md:p-8">
            <h2 className="text-3xl md:text-5xl text-center text-gray-700 tracking-wider mb-8">Picking a winner...</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {participants.map((p, index) => (
                <LegoBrick
                  key={p.id}
                  name={p.name}
                  color={p.color}
                  isHighlighted={index === highlightedIndex}
                />
              ))}
            </div>
          </div>
        );
      case GameState.FINISHED:
        return winner ? <WinnerDisplay winner={winner} onReset={handleReset} onNewRaffle={handleNewRaffle} /> : null;
      case GameState.IDLE:
      default:
        return (
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-4 border-gray-300 w-full max-w-lg mx-auto">
            <h1 className="text-4xl md:text-5xl text-center text-yellow-500 drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)] tracking-wider">LEGO RAFFLE</h1>
            <h2 className="text-xl text-center text-gray-600 mt-2 mb-6">Enter names, one per line</h2>
            <textarea
              className="w-full h-48 p-4 border-4 border-gray-300 rounded-lg text-lg focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 resize-none shadow-inner"
              placeholder="Alice&#10;Bob&#10;Charlie..."
              value={participantsText}
              onChange={(e) => setParticipantsText(e.target.value)}
            />
            {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
            <button
              onClick={handleStartRaffle}
              disabled={parsedParticipants.length < 2}
              className="mt-6 w-full text-white text-3xl tracking-wider py-4 rounded-lg shadow-lg transition-all duration-300 transform active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 border-b-8 border-red-800 hover:bg-red-500 disabled:bg-gray-400 disabled:border-gray-600"
            >
              DRAW WINNER!
            </button>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      {renderContent()}
    </main>
  );
};

export default App;