"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { LeaderboardEntry } from '@/lib/types';

interface LeaderboardProps {
  gameId: string;
}

export function Leaderboard({ gameId }: LeaderboardProps) {
  const firestore = useFirestore();

  const leaderboardQuery = useMemoFirebase(() => {
    if (!firestore || !gameId) return null;
    return query(
      collection(firestore, 'leaderboards', gameId, 'entries'),
      orderBy('score', 'desc'),
      limit(5)
    );
  }, [firestore, gameId]);

  const { data, isLoading } = useCollection<Omit<LeaderboardEntry, 'rank'>>(leaderboardQuery);
  
  const leaderboardData = data?.map((entry, index) => ({
      ...entry,
      rank: index + 1,
  }));

  if (isLoading) {
      return (
          <Card className="bg-card/50">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      Leaderboard
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 animate-pulse">
                          <div className="font-bold text-lg w-6 h-6 bg-muted rounded"></div>
                          <div className="w-10 h-10 rounded-full bg-muted"></div>
                          <div className="flex-grow space-y-2">
                              <div className="h-4 w-24 bg-muted rounded"></div>
                              <div className="h-3 w-16 bg-muted rounded"></div>
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
      )
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Crown className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {leaderboardData.map((entry, index) => (
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
