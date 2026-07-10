export const metadata = {
  robots: { index: false, follow: false },
};

export default function HiddenLayout({ children }) {
  return (
    <div className="grid min-h-screen place-items-center bg-zinc-950 px-4 font-sans antialiased">
      {children}
    </div>
  );
}
