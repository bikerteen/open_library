"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-foreground/10 px-4 py-2 text-sm font-semibold text-foreground/70 hover:border-brand-pink hover:text-brand-pink"
    >
      Log out
    </button>
  );
}
