import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20 group-hover:border-accent/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={game.coverImage.url}
              alt={game.coverImage.alt}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={game.coverImage.hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <h3 className="font-headline text-xl font-bold">{game.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{game.genre}</Badge>
            <Badge
              className={cn(
                game.difficulty === 'Easy' && 'bg-green-200 text-green-900',
                game.difficulty === 'Medium' && 'bg-yellow-200 text-yellow-900',
                game.difficulty === 'Hard' && 'bg-red-200 text-red-900',
                game.difficulty === 'Expert' && 'bg-purple-200 text-purple-900',
                'dark:bg-opacity-20'
              )}
            >
              {game.difficulty}
            </Badge>
          </div>
           <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
        </CardFooter>
      </Card>
    </Link>
  );
}
