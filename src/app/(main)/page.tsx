"use client";

import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCollection } from '@/firebase';
import { collection, limit, query } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { Game, Post } from '@/lib/types';

export default function Home() {
  const firestore = useFirestore();

  const gamesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'games'), limit(4));
  }, [firestore]);
  const { data: featuredGames } = useCollection<Game>(gamesQuery);

  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogPosts'), limit(2));
  }, [firestore]);
  const { data: latestPosts } = useCollection<Post>(postsQuery);

  const heroImage = {
    imageUrl: "https://images.unsplash.com/photo-1762279389042-9439bfb6c155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWN8ZW58MHx8fHwxNzYzMzE2OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Abstract futuristic digital landscape",
    imageHint: "abstract futuristic"
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter leading-tight" style={{textShadow: '0 0 20px hsl(var(--primary))'}}>
            The Future of Gaming is Here
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
            Explore cutting-edge games, discover the latest tech news, and join a community of innovators.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-shadow hover:shadow-primary/40">
              <Link href="/games">
                Browse Games <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white/50 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm">
              <Link href="/blog">
                Latest News
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Featured Games</h2>
          <p className="mt-2 text-center text-muted-foreground">Hand-picked titles pushing the boundaries of play.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames?.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Latest News</h2>
          <p className="mt-2 text-center text-muted-foreground">Stay updated with the world of tech and gaming.</p>
          <div className="mt-12 max-w-3xl mx-auto space-y-8">
            {latestPosts?.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 relative aspect-video w-full rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.thumbnail.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.thumbnail.hint}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      {post.date && new Date((post.date as any).seconds * 1000).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-bold font-headline mt-1 group-hover:text-primary">{post.title}</h3>
                    <p className="text-muted-foreground mt-2">{post.summary}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/blog">
                <Newspaper className="mr-2 h-4 w-4" /> View All Posts
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
