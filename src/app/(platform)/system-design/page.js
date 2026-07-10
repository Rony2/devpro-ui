import { getAllSystemDesign } from "@/lib/content/systemDesign";
import { SystemDesignListClient } from "@/components/system-design/SystemDesignListClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Frontend System Design",
  description:
    "Master frontend system design with in-depth scenarios covering architecture, rendering, state management, performance, and scalability for senior and staff engineers.",
  openGraph: {
    title: "Frontend System Design | Devpro",
    description:
      "Master frontend system design with in-depth scenarios covering architecture, rendering, state management, performance, and scalability.",
    url: "/system-design",
    type: "website",
    images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: "Devpro System Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend System Design | Devpro",
    description:
      "Master frontend system design for senior and staff engineer interviews.",
    images: ["/seo-icon.svg"],
  },
};

export default function SystemDesignPage() {
  const scenarios = getAllSystemDesign();

  const totalHours = Math.round(
    scenarios.reduce((sum, s) => sum + (s.estimatedMinutes || 0), 0) / 60,
  );

  return (
    <div className="container-page mt-6 pb-14">
      <SystemDesignListClient scenarios={scenarios} totalHours={totalHours} />
    </div>
  );
}
