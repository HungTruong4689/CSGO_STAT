import { useEffect, useState } from 'react';
import { parseCSGOLog, type PlayerStats, type Score } from './utils/parser';
import { PlayerStatsTable } from './components/PlayerStatsTable';
import { ScoreboardChart } from './components/ScoreboardChart';

function App() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [scoreboard, setScoreboard] = useState<Score[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/NAVIvsVitaGF-Nuke.txt');
      const text = await res.text();
      const { players, scoreboard } = parseCSGOLog(text);
      setPlayers(players);
      setScoreboard(scoreboard);
    };

    fetchData();
  }, []);

  const halfIndex = Math.floor(scoreboard.length / 2);
  const firstHalfRounds = scoreboard.slice(0, halfIndex + 1);
  const secondHalfRounds = scoreboard.slice(halfIndex + 1);
  const firstHalfCTScore = firstHalfRounds.reduce(
    (acc, round) => acc + round.ct,
    0
  );
  const firstHalfTScore = firstHalfRounds.reduce(
    (acc, round) => acc + round.t,
    0
  );
  const secondHalfCTScore = secondHalfRounds.reduce(
    (acc, round) => acc + round.ct,
    0
  );
  const secondHalfTScore = secondHalfRounds.reduce(
    (acc, round) => acc + round.t,
    0
  );
  const firstHardWin = firstHalfCTScore > firstHalfTScore ? 'CT' : 'T';
  const secondHardWin = secondHalfCTScore > secondHalfTScore ? 'CT' : 'T';

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-2">
        🔥 CS:GO Match Dashboard
      </h1>
      <p className="text-center text-sm text-gray-400 mb-4">
        🕑 First Half:{' '}
        <span className="text-white">
          {firstHalfCTScore}:{firstHalfTScore}
        </span>
        (<span className="text-green-400">{firstHardWin}</span>) | Second Half:{' '}
        <span className="text-white">
          {secondHalfCTScore}:{secondHalfTScore}
        </span>
        (<span className="text-green-400">{secondHardWin}</span>)
      </p>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <PlayerStatsTable players={players} />
        </div>
        <div>
          <ScoreboardChart scoreboard={scoreboard} />
        </div>
      </div>
    </div>
  );
}

export default App;
