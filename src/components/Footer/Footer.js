import Link from "next/link";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="glass-soft border-t border-[var(--glass-border)]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div>
                    <p className="font-display text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
                        DevPro
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Curated frontend interview prep for focused learning.
                    </p>
                </div>

                <div className="flex items-center gap-5 text-sm">
                    <Link
                        href="/"
                        className="glass-pill glass-interactive rounded-full px-3 py-1.5 font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] dark:text-slate-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/quiz"
                        className="glass-pill glass-interactive rounded-full px-3 py-1.5 font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] dark:text-slate-200"
                    >
                        Quiz Library
                    </Link>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">Copyright {year} DevPro</p>
            </div>
        </footer>
    );
};

export default Footer;