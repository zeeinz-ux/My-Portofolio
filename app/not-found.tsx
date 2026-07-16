import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
      <p className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-6 text-violet-500">
        Error 404
      </p>
      <h1
        className="text-6xl sm:text-8xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Lost?
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full text-sm font-medium hover:bg-violet-700 transition-colors"
      >
        Back Home
      </Link>
    </main>
  );
}
