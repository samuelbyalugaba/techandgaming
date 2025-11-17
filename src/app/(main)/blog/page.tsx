"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Post } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const firestore = useFirestore();
  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogPosts'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: posts, isLoading } = useCollection<Post>(postsQuery);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">News & Updates</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          The latest articles, announcements, and insights from the Tech and Gaming world.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)}
        {posts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 hover:bg-card">
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src={post.thumbnail.url}
                    alt={post.thumbnail.alt}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={post.thumbnail.hint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground">
                  {post.date && new Date((post.date as any).seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="text-xl font-bold font-headline mt-2">{post.title}</h2>
                <p className="mt-3 text-muted-foreground flex-grow">{post.summary}</p>
                <div className="mt-4">
                  <Badge variant="secondary">Read More</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const PostCardSkeleton = () => (
  <Card className="h-full flex flex-col bg-card/50">
    <CardHeader className="p-0">
      <Skeleton className="aspect-video w-full rounded-t-lg" />
    </CardHeader>
    <CardContent className="p-6 flex-grow flex flex-col">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-6 w-full mt-2" />
      <Skeleton className="h-4 w-4/5 mt-3" />
      <Skeleton className="h-4 w-3/5 mt-1" />
      <div className="flex-grow" />
      <Skeleton className="h-8 w-24 mt-4" />
    </CardContent>
  </Card>
);
