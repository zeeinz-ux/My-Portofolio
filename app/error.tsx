"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
      <p className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-6 text-violet-500">
        Something went wrong
      </p>
      <h1
        className="text-4xl sm:text-5xl font-bold mb-4 text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Unexpected Error
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md mb-10">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full text-sm font-medium hover:bg-violet-700 transition-colors"
      >
        Try Again
      </button>
    </main>
  );
}
