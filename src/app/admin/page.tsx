import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { games, posts } from "@/lib/data"
import { Gamepad2, Newspaper, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const totalGames = games.length
  const totalPosts = posts.length

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

      <Card className="mt-8">
        <CardHeader>
            <CardTitle>Welcome to the CMS</CardTitle>
            <CardDescription>Use the navigation on the left to add, edit, or delete games and blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>This dashboard is a simplified Content Management System (CMS) for the Tech And Gaming website. Data is currently mocked and not connected to a live Firestore database. All changes made here are for demonstration purposes and will not persist.</p>
        </CardContent>
      </Card>
    </div>
  )
}
