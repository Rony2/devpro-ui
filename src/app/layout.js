import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { Work_Sans } from "next/font/google"
import Footer from "@/components/Footer/Footer";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: "--font-work-sans",
  display: 'swap',
})

export const metadata = {
  title: "JavaScript Job Interview Question & Preparation | Devpro",
  description: "Ace your frontend job interviews with Devpro! Explore a comprehensive collection of JavaScript interview questions, coding interview strategies, and essential tips. Prepare effectively with curated resources designed to cover common interview topics and boost your chances of landing your next frontend developer role.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} flex flex-col h-screen`}>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
