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
  title: "Devpro",
  description:
    "Advanced frontend engineering practice for senior, lead, and staff engineers.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

// Inline script that runs before paint — applies the stored theme class
// so there is no flash of wrong theme on navigation or hard refresh.
const themeScript = `(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'dark' && t !== 'light') {
      t = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
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
