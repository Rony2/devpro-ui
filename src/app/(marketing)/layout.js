import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-6 py-8 sm:px-10 lg:px-16">{children}</main>
      <Footer />
    </div>
  );
}
