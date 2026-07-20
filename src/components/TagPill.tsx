export default function TagPill({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const base =
    "rounded-full px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap";
  const styles = active
    ? "bg-foreground text-background"
    : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10";

  if (!onClick) {
    return <span className={`${base} ${styles}`}>{children}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} cursor-pointer`}>
      {children}
    </button>
  );
}
