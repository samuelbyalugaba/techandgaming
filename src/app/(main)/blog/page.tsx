import { posts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">News & Updates</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          The latest articles, announcements, and insights from the Tech and Gaming world.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20 group-hover:border-accent/50 group-hover:-translate-y-1">
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
                <p className="text-sm text-muted-foreground">{post.date}</p>
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
