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
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { Game } from "@/lib/types";
import { GameFormSheet } from "@/components/admin/game-form-sheet";

export default function AdminGamesPage() {
    const firestore = useFirestore();
    const gamesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'games') : null, [firestore]);
    const { data: games } = useCollection<Game>(gamesCollection);

    const [sheetOpen, setSheetOpen] = useState(false);
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const handleAdd = () => {
        setEditingGame(null);
        setSheetOpen(true);
    }

    const handleEdit = (game: Game) => {
        setEditingGame(game);
        setSheetOpen(true);
    }
    
    const handleDelete = (gameId: string) => {
        if(firestore && confirm('Are you sure you want to delete this game?')) {
            const docRef = doc(firestore, "games", gameId);
            deleteDocumentNonBlocking(docRef);
        }
    }

    const handleSave = (gameData: Partial<Game>) => {
        if (firestore && gamesCollection) {
            if (editingGame?.id) {
                const docRef = doc(firestore, "games", editingGame.id);
                updateDocumentNonBlocking(docRef, gameData);
            } else {
                 addDocumentNonBlocking(gamesCollection, {
                    ...gameData,
                    // Default values for new games
                    tags: [],
                    screenshots: [],
                    coverImage: { url: 'https://picsum.photos/seed/default-game/400/500', alt: 'Default game cover', hint: 'game cover' },
                    trailerUrl: '',
                    playUrl: '',
                 });
            }
        }
        setSheetOpen(false);
        setEditingGame(null);
    }
    
  return (
    <div>
        <div className="flex items-center">
            <h1 className="text-3xl font-bold font-headline">Games</h1>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" onClick={handleAdd}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Game
                    </span>
                </Button>
            </div>
        </div>

        <GameFormSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            game={editingGame}
            onSave={handleSave}
        />

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
                            <DropdownMenuItem onClick={() => handleEdit(game)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(game.id)}
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
