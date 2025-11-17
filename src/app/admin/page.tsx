"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gamepad2, Newspaper, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { Game, Post } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const firestore = useFirestore();

  const gamesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'games') : null, [firestore]);
  const { data: games } = useCollection<Game>(gamesCollection);

  const postsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'blogPosts') : null, [firestore]);
  const { data: posts } = useCollection<Post>(postsCollection);
  
  const recentGamesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'games'), orderBy('title', 'desc'), limit(5)) : null, [firestore]);
  const { data: recentGames } = useCollection<Game>(recentGamesQuery);

  const recentPostsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'blogPosts'), orderBy('date', 'desc'), limit(5)) : null, [firestore]);
  const { data: recentPosts } = useCollection<Post>(recentPostsQuery);

  const totalGames = games?.length ?? 0;
  const totalPosts = posts?.length ?? 0;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <p className="text-muted-foreground">An overview of your content.</p>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Games
            </CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGames}</div>
            <p className="text-xs text-muted-foreground">
              games currently in the database
            </p>
            <Button size="sm" className="mt-4" asChild>
                <Link href="/admin/games">Manage Games <ArrowUpRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              posts published on the blog
            </p>
             <Button size="sm" className="mt-4" asChild>
                <Link href="/admin/blog">Manage Posts <ArrowUpRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
              <CardTitle>Recent Games</CardTitle>
              <CardDescription>The last 5 games added.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentGames?.map(game => (
                    <TableRow key={game.id}>
                      <TableCell>{game.title}</TableCell>
                      <TableCell>{game.genre}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>The last 5 posts published.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPosts?.map(post => (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell> {post.date && new Date((post.date as any).seconds * 1000).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
