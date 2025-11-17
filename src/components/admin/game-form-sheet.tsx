
"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Game } from "@/lib/types";
import { useEffect, useState } from "react";

interface GameFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game | null;
  onSave: (gameData: Partial<Game>) => void;
}

export function GameFormSheet({ open, onOpenChange, game, onSave }: GameFormSheetProps) {
  const [formData, setFormData] = useState<Partial<Game>>({});

  useEffect(() => {
    if (game) {
      setFormData(game);
    } else {
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        genre: 'Sci-Fi',
        difficulty: 'Medium',
        trailerUrl: '',
        mechanics: [],
        tags: [],
      });
    }
  }, [game, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleListChange = (name: 'tags' | 'mechanics', value: string) => {
    setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()).filter(Boolean) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>{game ? 'Edit Game' : 'Add a New Game'}</SheetTitle>
            <SheetDescription>
              {game ? 'Edit the details for this game.' : 'Fill in the details for the new game.'} Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto px-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input name="title" id="title" value={formData.title || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longDescription" className="text-right">Long Desc.</Label>
              <Textarea name="longDescription" id="longDescription" value={formData.longDescription || ''} onChange={handleChange} className="col-span-3 h-32" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genre" className="text-right">Genre</Label>
                <Select name="genre" value={formData.genre} onValueChange={(value) => handleSelectChange('genre', value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                        <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Strategy">Strategy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="difficulty" className="text-right">Difficulty</Label>
                <Select name="difficulty" value={formData.difficulty} onValueChange={(value) => handleSelectChange('difficulty', value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trailerUrl" className="text-right">Trailer URL</Label>
              <Input name="trailerUrl" id="trailerUrl" value={formData.trailerUrl || ''} onChange={handleChange} className="col-span-3" placeholder="https://youtube.com/embed/..."/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input name="tags" id="tags" value={formData.tags?.join(', ') || ''} onChange={(e) => handleListChange('tags', e.target.value)} className="col-span-3" placeholder="tag1, tag2, tag3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mechanics" className="text-right">Mechanics</Label>
              <Textarea name="mechanics" id="mechanics" value={formData.mechanics?.join(', ') || ''} onChange={(e) => handleListChange('mechanics', e.target.value)} className="col-span-3" placeholder="mechanic1, mechanic2"/>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
