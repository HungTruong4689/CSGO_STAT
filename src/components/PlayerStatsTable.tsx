export interface Player {
  name: string;
  team: string;
  kills: number;
  deaths: number;
  damage: number;
  headshots: number;
  rounds: number;
}

export const PlayerStatsTable = ({ players }: { players: Player[] }) => {
  const topKills = Math.max(...players.map((p) => p.kills));
  const teamNames = players.map((p) => p.team);
  console.log('Team Names:', teamNames);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Player Stats</h2>
      <table className="min-w-full bg-gray-800 rounded overflow-hidden">
        <thead className="bg-gray-700 text-left text-sm uppercase text-gray-300">
          <tr>
            <th className="px-4 py-2">Player</th>
            <th className="px-4 py-2 text-center">Team</th>
            <th className="px-4 py-2">
              <div className="flex items-center gap-1">
                <span>⚔️</span>
                <span>K</span>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="flex items-center gap-1">
                <span>💀</span>
                <span>D</span>
              </div>
            </th>
            <th className="px-4 py-2">HS</th>
            <th className="px-4 py-2">Damage</th>
            <th className="px-4 py-2">Rounds</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {players.map((p) => (
            <tr
              key={p.name}
              className="border-b border-gray-700 hover:bg-gray-700 transition"
            >
              <td className="px-4 py-2 font-semibold">
                <div className="flex items-center gap-1">
                  {p.name}
                  {p.kills === topKills && (
                    <span className="text-yellow-400">★</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    p.team === 'CT'
                      ? 'bg-blue-600'
                      : p.team === 'TERRORIST'
                        ? 'bg-yellow-600'
                        : 'bg-gray-600'
                  }`}
                >
                  {p.team || 'UNKNOWN'}
                </span>
              </td>
              <td className="px-4 py-2 text-center">{p.kills}</td>
              <td className="px-4 py-2 text-center">{p.deaths}</td>
              <td className="px-4 py-2 text-center">{p.headshots}</td>
              <td className="px-4 py-2 text-center">{p.damage}</td>
              <td className="px-4 py-2 text-center">{p.rounds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
