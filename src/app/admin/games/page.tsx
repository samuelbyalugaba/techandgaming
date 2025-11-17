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
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { Game } from "@/lib/types";
import React from "react";

export default function AdminGamesPage() {
    const firestore = useFirestore();
    const gamesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'games') : null, [firestore]);
    const { data: games } = useCollection<Game>(gamesCollection);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newGame = Object.fromEntries(formData.entries());
    if (gamesCollection) {
        // This is a simplified version. In a real app, you'd have better data handling and validation.
        addDocumentNonBlocking(gamesCollection, {
            ...newGame,
            tags: [],
            screenshots: [],
            mechanics: [],
            coverImage: { url: '', alt: '', hint: ''}
        });
    }
    form.reset();
  }
    
  return (
    <div>
        <div className="flex items-center">
            <h1 className="text-3xl font-bold font-headline">Games</h1>
            <div className="ml-auto flex items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Game
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <form onSubmit={handleSave}>
                        <SheetHeader>
                        <SheetTitle>Add a New Game</SheetTitle>
                        <SheetDescription>
                            Fill in the details for the new game. Click save when you're done.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto px-1">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input name="title" id="title" placeholder="New Game" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea name="description" id="description" placeholder="Short description" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="longDescription" className="text-right">Long Desc.</Label>
                                <Textarea name="longDescription" id="longDescription" placeholder="Full game description" className="col-span-3 h-32" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="genre" className="text-right">Genre</Label>
                                <Input name="genre" id="genre" defaultValue="Sci-Fi" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="difficulty" className="text-right">Difficulty</Label>
                                <Input name="difficulty" id="difficulty" defaultValue="Medium" className="col-span-3" />
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
                    <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {games?.map(game => (
                    <TableRow key={game.id}>
                        <TableCell className="hidden sm:table-cell">
                        {game.coverImage?.url && <Image
                            alt={game.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={game.coverImage.url}
                            width="64"
                            data-ai-hint={game.coverImage.hint}
                        />}
                        </TableCell>
                        <TableCell className="font-medium">{game.title}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{game.genre}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{game.difficulty}</TableCell>
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
                                    if(firestore){
                                        const docRef = require("firebase/firestore").doc(firestore, "games", game.id);
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
