export const metadata = {
  title: "Frontend Interview Quizzes",
  description:
    "Test your knowledge with advanced frontend quizzes on JavaScript, React, TypeScript, browser internals, and more. Built for senior and staff engineers.",
  openGraph: {
    title: "Frontend Interview Quizzes | Devpro",
    description:
      "Test your knowledge with advanced frontend quizzes on JavaScript, React, TypeScript, browser internals, and more.",
    url: "/quiz",
    type: "website",
    images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: "Devpro Quizzes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Interview Quizzes | Devpro",
    description:
      "Test your knowledge with advanced frontend quizzes on JavaScript, React, TypeScript, browser internals, and more.",
    images: ["/seo-icon.svg"],
  },
};

export default function QuizLayout({ children }) {
  return children;
}
