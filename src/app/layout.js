import "./globals.css";
import { JetBrains_Mono, Space_Grotesk, Archivo_Black } from "next/font/google";
import { StyleFlagProvider } from "@/components/shared/StyleFlagProvider";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Devpro — Frontend Engineering Practice",
    template: "%s | Devpro",
  },
  description:
    "Advanced frontend engineering practice for senior, lead, and staff engineers. Coding problems, system design, quizzes, and guides.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: ["frontend", "system design", "coding problems", "senior engineer", "staff engineer", "interview prep", "javascript", "react", "typescript"],
  authors: [{ name: "Devpro" }],
  openGraph: {
    type: "website",
    siteName: "Devpro",
    title: "Devpro — Frontend Engineering Practice",
    description: "Advanced frontend engineering practice for senior, lead, and staff engineers.",
    images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: "Devpro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devpro — Frontend Engineering Practice",
    description: "Advanced frontend engineering practice for senior, lead, and staff engineers.",
    images: ["/seo-icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/seo-icon.svg" },
};

// Inline script that runs before paint — applies the stored theme class
// so there is no flash of wrong theme on navigation or hard refresh.
const themeScript = `(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'dark' && t !== 'light') {
      t = 'light';
    }
    var d = document.documentElement;
    d.classList.add(t);
    d.classList.remove(t === 'dark' ? 'light' : 'dark');
    d.style.colorScheme = t;
  } catch(e) {}
})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} min-h-screen bg-[var(--bg)] text-[var(--text)]`}>
        <StyleFlagProvider>{children}</StyleFlagProvider>
      </body>
    </html>
  );
}
