import { leaderboardData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import Image from 'next/image';

interface LeaderboardProps {
  gameId: string;
}

export function Leaderboard({ gameId }: LeaderboardProps) {
  const data = leaderboardData[gameId];

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Crown className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {data.map((entry, index) => (
            <li key={entry.rank} className="flex items-center gap-4">
              <div className="font-bold text-lg w-6 text-center">{entry.rank}</div>
              <Image
                src={entry.avatar}
                alt={entry.player}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-grow">
                <p className="font-semibold">{entry.player}</p>
                <p className="text-sm text-muted-foreground">{entry.score.toLocaleString()} points</p>
              </div>
              {index === 0 && <Crown className="h-5 w-5 text-yellow-400" />}
              {index === 1 && <Crown className="h-5 w-5 text-gray-400" />}
              {index === 2 && <Crown className="h-5 w-5 text-orange-400" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
