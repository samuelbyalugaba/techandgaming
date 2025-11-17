"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { Post } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const firestore = useFirestore();

  const postQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogPosts'), where('slug', '==', params.slug), limit(1));
  }, [firestore, params.slug]);

  const { data: posts, isLoading } = useCollection<Post>(postQuery);
  const post = posts?.[0];

  // Simple markdown to HTML conversion
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold font-headline mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold font-headline mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold font-headline mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ')) {
            return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>
        }
        if(line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="leading-relaxed my-4">{line}</p>;
      })
      .reduce((acc: JSX.Element[], el) => {
          if(el.type === 'li' && acc.length > 0 && acc[acc.length-1].type === 'ul') {
              const lastUl = acc[acc.length-1];
              const newUl = <ul key={acc.length-1} className={lastUl.props.className}>{lastUl.props.children}{el}</ul>;
              return [...acc.slice(0, -1), newUl];
          }
          if(el.type === 'li') {
              return [...acc, <ul key={acc.length} className="space-y-2 my-4">{el}</ul>]
          }
          return [...acc, el];
      }, []);
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    notFound();
  }
  
  const postDate = post.date && (post.date as any).seconds ? new Date((post.date as any).seconds * 1000) : new Date();

  return (
    <article>
      <div className="relative w-full h-[40vh]">
        <Image
          src={post.thumbnail.url}
          alt={post.thumbnail.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={post.thumbnail.hint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      
      <div className="container max-w-3xl mx-auto -mt-24 relative z-10 pb-16 md:pb-24">
        <div className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10 shadow-xl">
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-center">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 prose prose-lg prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </div>
    </article>
  );
}

const PostSkeleton = () => (
  <article>
    <Skeleton className="relative w-full h-[40vh]" />
    <div className="container max-w-3xl mx-auto -mt-24 relative z-10 pb-16 md:pb-24">
      <div className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10 shadow-xl">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <div className="flex justify-center items-center gap-6 mt-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <br/>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  </article>
);
