"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { Post } from "@/lib/types";
import React from "react";

export default function AdminBlogPage() {
    const firestore = useFirestore();
    const postsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'blogPosts') : null, [firestore]);
    const { data: posts } = useCollection<Post>(postsCollection);
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const newPost = Object.fromEntries(formData.entries());

        if (postsCollection) {
            addDocumentNonBlocking(postsCollection, {
                ...newPost,
                author: 'Admin', // Assuming admin for now
                date: serverTimestamp(),
                thumbnail: { url: '', alt: '', hint: ''}
            });
        }
        form.reset();
    }
    
  return (
    <div>
        <div className="flex items-center">
            <h1 className="text-3xl font-bold font-headline">Blog Posts</h1>
            <div className="ml-auto flex items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Post
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-xl">
                        <form onSubmit={handleSave}>
                        <SheetHeader>
                        <SheetTitle>Add a New Post</SheetTitle>
                        <SheetDescription>
                            Write your new blog post here. Markdown is supported.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto px-1">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input name="title" id="title" placeholder="Post Title" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="slug" className="text-right">Slug</Label>
                                <Input name="slug" id="slug" placeholder="post-title" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="summary" className="text-right">Summary</Label>
                                <Textarea name="summary" id="summary" placeholder="A short summary of the post" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="content" className="text-right pt-2">Content</Label>
                                <Textarea name="content" id="content" placeholder="Write your post content in Markdown..." className="col-span-3 h-64" />
                            </div>
                        </div>
                        <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                        </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            </div>
        </div>

        <div className="mt-6">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {posts?.map(post => (
                    <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                        <TableCell className="hidden md:table-cell">
                             {post.date && new Date((post.date as any).seconds * 1000).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                    if (firestore) {
                                        const docRef = require("firebase/firestore").doc(firestore, "blogPosts", post.id);
                                        deleteDocumentNonBlocking(docRef);
                                    }
                                }}
                            >Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
