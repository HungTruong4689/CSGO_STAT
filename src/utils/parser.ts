/* eslint-disable @typescript-eslint/no-unused-vars */
// src/utils/parser.ts
export interface PlayerStats {
  name: string;
  team: string;
  kills: number;
  deaths: number;
  damage: number;
  headshots: number;
  rounds: number;
}

export interface Score {
  ct: number;
  t: number;
}

export function parseCSGOLog(log: string): {
  players: PlayerStats[];
  scoreboard: Score[];
} {
  const lines = log.split('\n');

  const players: Record<string, PlayerStats> = {};
  const scoreboard: Score[] = [];

  let roundCount = 0;

  const normalizeTeam = (team: string) => {
    if (team.toUpperCase() === 'CT') return 'CT';
    if (team.toUpperCase().includes('T')) return 'TERRORIST';
    return 'UNKNOWN';
  };

  for (const line of lines) {
    // Track round starts
    if (line.includes('World triggered "Round_Start"')) {
      roundCount++;
    }

    // Scoreboard lines
    if (line.includes('MatchStatus: Score:')) {
      const match = line.match(/Score:\s+(\d+):(\d+)/);
      if (match) {
        scoreboard.push({ ct: parseInt(match[1]), t: parseInt(match[2]) });
      }
    }

    // Kill events
    if (
      line.includes('killed') &&
      line.includes('with') &&
      !line.includes('other')
    ) {
      const killerMatch = line.match(/"([^"]+)<\d+><[^>]+><([^>]*)>"/);
      const victimMatch = line.match(/killed\s+"([^"]+)<\d+><[^>]+><([^>]*)>"/);
      const isHeadshot = line.includes('(headshot)');

      if (killerMatch && victimMatch) {
        const [_, killer, killerTeamRaw] = killerMatch;
        const [__, victim, victimTeam] = victimMatch;
        const killerTeam = normalizeTeam(killerTeamRaw || '');

        if (!players[killer]) {
          players[killer] = {
            name: killer,
            team: killerTeam,
            kills: 0,
            deaths: 0,
            damage: 0,
            headshots: 0,
            rounds: 0,
          };
        }
        if (!players[victim]) {
          players[victim] = {
            name: victim,
            team: victimTeam,
            kills: 0,
            deaths: 0,
            damage: 0,
            headshots: 0,
            rounds: 0,
          };
        }

        if (killer !== victim) {
          players[killer].kills += 1;
          if (isHeadshot) players[killer].headshots += 1;
          players[victim].deaths += 1;
        }
      }
    }

    // Attack events (for damage)
    if (line.includes('attacked') && line.includes('(damage "')) {
      const match = line.match(
        /"([^"]+)<\d+><[^>]+><[^>]*>".*\(damage\s+"(\d+)"\)/
      );
      if (match) {
        const [_, attacker, dmg] = match;
        if (!players[attacker]) {
          players[attacker] = {
            name: attacker,
            team: '',
            kills: 0,
            deaths: 0,
            damage: 0,
            headshots: 0,
            rounds: 0,
          };
        }
        players[attacker].damage += parseInt(dmg);
      }
    }
  }

  // Assign round count to all players
  for (const p of Object.values(players)) {
    p.rounds = roundCount;
  }

  const sortedPlayers = Object.values(players).sort(
    (a, b) => b.kills - a.kills
  );

  return { players: sortedPlayers, scoreboard };
}
