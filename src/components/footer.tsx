import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:py-0">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground">
            All Rights Reserved. Made With ❤️@ TSJ Diversified Group
          </p>
        </div>
      </div>
    </footer>
  );
}
