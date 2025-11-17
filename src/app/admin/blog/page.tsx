"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp, doc } from "firebase/firestore";
import { Post } from "@/lib/types";
import { PostFormSheet } from "@/components/admin/post-form-sheet";

export default function AdminBlogPage() {
    const firestore = useFirestore();
    const postsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'blogPosts') : null, [firestore]);
    const { data: posts } = useCollection<Post>(postsCollection);
    
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleAdd = () => {
        setEditingPost(null);
        setSheetOpen(true);
    }

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setSheetOpen(true);
    }

    const handleDelete = (postId: string) => {
        if(firestore && confirm('Are you sure you want to delete this post?')) {
            const docRef = doc(firestore, "blogPosts", postId);
            deleteDocumentNonBlocking(docRef);
        }
    }

    const handleSave = (postData: Partial<Post>) => {
        if (firestore && postsCollection) {
            if (editingPost?.id) {
                const docRef = doc(firestore, "blogPosts", editingPost.id);
                updateDocumentNonBlocking(docRef, { ...postData, date: serverTimestamp() });
            } else {
                addDocumentNonBlocking(postsCollection, {
                    ...postData,
                    author: 'Admin', // Assuming admin for now
                    date: serverTimestamp(),
                    thumbnail: { url: 'https://picsum.photos/seed/default-post/400/225', alt: 'Default post thumbnail', hint: 'blog thumbnail'}
                });
            }
        }
        setSheetOpen(false);
        setEditingPost(null);
    }
    
  return (
    <div>
        <div className="flex items-center">
            <h1 className="text-3xl font-bold font-headline">Blog Posts</h1>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Post
                    </span>
                </Button>
            </div>
        </div>

        <PostFormSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            post={editingPost}
            onSave={handleSave}
        />

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
                            <DropdownMenuItem onClick={() => handleEdit(post)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(post.id)}
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
