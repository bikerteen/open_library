export default function Footer() {
  return (
    <footer className="border-t border-foreground/8 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>
          <span className="font-display font-bold text-foreground">THE OPEN LIBRARY</span> — free
          &amp; open source, for everyone.
        </p>
        <p>No paywalls. No logins required. Just good tools.</p>
      </div>
    </footer>
  );
}
