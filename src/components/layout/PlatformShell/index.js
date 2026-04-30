import { Header } from "@/components/layout/Header";

export function PlatformShell({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export function PlatformShellContent({ children }) {
  return <div className="container-page mt-6 pb-14">{children}</div>;
}
