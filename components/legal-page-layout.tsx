import type { ReactNode } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  content?: string;
  children?: ReactNode;
}

export function LegalPageLayout({
  title,
  subtitle,
  content,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="relative isolate overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-orange-50 via-white to-slate-50 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10"
        />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm">
            <Link
              href="/"
              className="font-medium text-slate-500 transition hover:text-[#e9653e] dark:text-zinc-400 dark:hover:text-orange-300"
            >
              Home
            </Link>
            <span className="mx-2 text-slate-300 dark:text-zinc-600" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-slate-700 dark:text-zinc-200">
              Legal
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#cf5633] shadow-sm dark:border-orange-400/20 dark:bg-zinc-900/80 dark:text-orange-300">
              <FileText aria-hidden="true" size={14} />
              Legal information
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-zinc-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200/90 bg-white px-5 py-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:rounded-3xl sm:px-9 sm:py-10 lg:px-12 lg:py-12 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
          {content && (
            <div
              className="prose prose-slate max-w-none break-words dark:prose-invert
                [&_h1]:mb-6 [&_h1]:mt-0 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-slate-950 sm:[&_h1]:text-4xl dark:[&_h1]:text-white
                [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-slate-900 sm:[&_h2]:text-[1.7rem] dark:[&_h2]:border-zinc-800 dark:[&_h2]:text-zinc-100
                [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-800 dark:[&_h3]:text-zinc-200
                [&_p]:mb-5 [&_p]:text-[0.98rem] [&_p]:leading-7 [&_p]:text-slate-600 sm:[&_p]:leading-8 dark:[&_p]:text-zinc-300
                [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
                [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
                [&_li]:pl-1 [&_li]:leading-7 [&_li]:text-slate-600 dark:[&_li]:text-zinc-300
                [&_a]:font-semibold [&_a]:text-[#dc5c36] [&_a]:underline [&_a]:decoration-orange-300 [&_a]:underline-offset-4 [&_a:hover]:text-[#b94322] dark:[&_a]:text-orange-300 dark:[&_a:hover]:text-orange-200
                [&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-zinc-100
                [&_img]:my-7 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl
                [&_blockquote]:border-l-4 [&_blockquote]:border-orange-300 [&_blockquote]:bg-orange-50/70 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:text-slate-700 dark:[&_blockquote]:bg-zinc-800/70 dark:[&_blockquote]:text-zinc-200"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {children}
        </article>
      </section>
    </main>
  );
}
