"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong");
      return;
    }

    const from = searchParams.get("from") || "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-14">
      <div className="mb-8 text-center">
        <span className="text-3xl">🔐</span>
        <h1 className="mt-3 font-display text-2xl font-bold">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Curators only — everyone else, enjoy the library!</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-foreground/8 bg-surface p-6 shadow-sm">
        <label className="block text-sm font-semibold">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
            autoComplete="username"
            required
          />
        </label>

        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="mt-4 text-sm font-semibold text-brand-pink">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-bold text-background transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
