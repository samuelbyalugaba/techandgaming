
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
import { Post } from "@/lib/types";
import { useEffect, useState, useId } from "react";

interface PostFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post | null;
  onSave: (postData: Partial<Post>) => void;
}

export function PostFormSheet({ open, onOpenChange, post, onSave }: PostFormSheetProps) {
    const [formData, setFormData] = useState<Partial<Post>>({});
    const descriptionId = useId();

    useEffect(() => {
        if (post) {
            setFormData(post);
        } else {
            setFormData({
                title: '',
                slug: '',
                summary: '',
                content: '',
            });
        }
    }, [post, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }
  
    return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl" aria-describedby={descriptionId}>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>{post ? 'Edit Post' : 'Add a New Post'}</SheetTitle>
            <SheetDescription id={descriptionId}>
              {post ? 'Edit this blog post.' : 'Write your new blog post here.'} Markdown is supported.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto px-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input name="title" id="title" value={formData.title || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">Slug</Label>
              <Input name="slug" id="slug" value={formData.slug || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="summary" className="text-right">Summary</Label>
              <Textarea name="summary" id="summary" value={formData.summary || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">Content</Label>
              <Textarea name="content" id="content" value={formData.content || ''} onChange={handleChange} className="col-span-3 h-64" />
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
