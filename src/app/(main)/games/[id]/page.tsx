
"use client"
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gamepad, PlayCircle, ShieldCheck } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Leaderboard } from '@/components/leaderboard';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Game } from '@/lib/types';

type GameDetailPageProps = {
  params: {
    id: string;
  };
};

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const firestore = useFirestore();
  const { id } = params;

  const gameRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'games', id);
  }, [firestore, id]);

  const { data: game, isLoading } = useDoc<Game>(gameRef);

  if (isLoading) {
    return <GameDetailSkeleton />;
  }

  if (!game) {
    notFound();
  }

  return (
    <div className="bg-secondary/20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-end text-white p-8">
        <Image
          src={game.coverImage.url}
          alt={game.coverImage.alt}
          fill
          className="object-cover"
          data-ai-hint={game.coverImage.hint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 container max-w-screen-2xl">
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-white border-white/50 bg-black/20 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold font-headline tracking-tighter" style={{textShadow: '0 0 10px black'}}>
            {game.title}
          </h1>
        </div>
      </section>

      <div className="container max-w-screen-2xl py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Play Button */}
          <a href={game.playUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button size="lg" className="w-full h-16 text-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                <PlayCircle className="mr-3 h-8 w-8" />
                Play Now
            </Button>
          </a>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold font-headline">About the Game</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{game.longDescription}</p>
          </div>

          {/* Trailer */}
          <div>
            <h2 className="text-2xl font-bold font-headline">Trailer</h2>
            <div className="mt-4 aspect-video rounded-lg overflow-hidden border">
              <iframe
                width="100%"
                height="100%"
                src={game.trailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <h2 className="text-2xl font-bold font-headline">Screenshots</h2>
            <Carousel className="w-full mt-4">
              <CarouselContent>
                {game.screenshots.map((ss, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={ss.url}
                        alt={ss.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={ss.hint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Game Mechanics */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Mechanics</h2>
            <ul className="space-y-3">
              {game.mechanics.map((mech) => (
                <li key={mech} className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{mech}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Leaderboard gameId={game.id} />

        </aside>
      </div>
    </div>
  );
}

const GameDetailSkeleton = () => (
  <div className="bg-secondary/20">
    <section className="relative h-[50vh] bg-muted animate-pulse p-8">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
    </section>
    <div className="container max-w-screen-2xl py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="w-full h-16 bg-muted animate-pulse rounded-lg"></div>
        <div>
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
        <div>
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
          <div className="mt-4 aspect-video rounded-lg bg-muted animate-pulse"></div>
        </div>
      </div>
      <aside className="space-y-8">
        <div>
          <div className="h-8 w-40 bg-muted animate-pulse rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
          </div>
        </div>
        <div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>
      </aside>
    </div>
  </div>
);
