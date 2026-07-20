import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/8 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-lilac via-brand-pink to-brand-yellow text-lg shadow-sm transition-transform group-hover:-rotate-6">
            📚
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            THE OPEN LIBRARY
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link
            href="/library"
            className="rounded-full px-4 py-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Library
          </Link>
          <Link
            href="/admin"
            className="rounded-full bg-foreground px-4 py-2 text-background transition-transform hover:scale-105"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
