import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import React from 'react';
import { codeToHtml } from 'shiki';
import questions from '../quiz.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-static';
export const dynamicParams = false;

const IMPORTANCE_BADGE = {
  high: 'bg-[var(--neo-pink)] text-black border-[var(--border)]',
  medium: 'bg-[var(--neo-yellow)] text-black border-[var(--border)]',
  low: 'bg-[var(--neo-green)] text-black border-[var(--border)]',
};

const DIFFICULTY_BADGE = {
  hard: 'bg-[var(--neo-pink)] text-black border-[var(--border)]',
  medium: 'bg-[var(--neo-yellow)] text-black border-[var(--border)]',
  easy: 'bg-[var(--neo-green)] text-black border-[var(--border)]',
};

const capitalizeWord = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);
const extractLanguage = (className = '') => {
  const match = className.match(/language-([\w-]+)/i);
  return match ? match[1] : 'text';
};

function getQuestionDataBySlug(slug) {
  return questions.find((question) => question.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const siteUrl = `https://devpro.in/quiz/${slug}`;
  const questionData = getQuestionDataBySlug(slug);

  if (!questionData) {
    return { title: 'Question not found', description: 'No description available for this question.' };
  }

  return {
    title: questionData.title,
    description: questionData.description,
    openGraph: {
      title: questionData.title,
      description: questionData.description || 'No description available.',
      url: siteUrl,
      type: 'article',
      images: [{ url: '/seo-icon.svg', width: 1200, height: 630, alt: `${questionData.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: questionData.title,
      description: questionData.description || 'Front End Developer Interview Preparation',
      images: ['/seo-icon.svg'],
    },
  };
}

const CodeBlock = async ({ children, className }) => {
  const lang = extractLanguage(className);
  const out = await codeToHtml(String(children).trim(), { lang, theme: 'github-dark' });
  return <div className="shiki-output" dangerouslySetInnerHTML={{ __html: out }} />;
};

export async function generateStaticParams() {
  return questions.map((item) => ({ slug: item.slug }));
}

const SlugPage = async ({ params }) => {
  const { slug } = await params;
  const questionData = getQuestionDataBySlug(slug);

  if (!questionData) notFound();

  const res = await fetch(`https://raw.githubusercontent.com/yangshun/top-javascript-interview-questions/refs/heads/main/questions/${slug}/en-US.mdx`);
  if (!res.ok) notFound();
  const data = await res.text();

  const { content, frontmatter } = await compileMDX({
    source: data,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: {
      pre: (props) => {
        const codeElement = React.Children.toArray(props.children).find(
          (child) => React.isValidElement(child) && child.type === 'code',
        );
        const codeClassName = React.isValidElement(codeElement) ? codeElement.props.className : '';
        const codeLanguage = extractLanguage(codeClassName);

        return (
          <div className="code-block">
            <div className="code-block-body">
              {codeElement ? React.cloneElement(codeElement, { className: codeElement.props.className }) : props.children}
            </div>
          </div>
        );
      },
      code: ({ className, children }) => {
        if (!className) {
          return <code>{children}</code>;
        }
        return <CodeBlock className={className}>{children}</CodeBlock>;
      },
    },
  });

  const currentIndex = questions.findIndex((item) => item.slug === slug);
  const currentPosition = currentIndex + 1;
  const progressPercent = Math.round((currentPosition / questions.length) * 100);
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

  return (
    <div className="mx-auto mt-6 w-full max-w-[1440px] px-4 pb-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* ── Sidebar ────────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7.5rem)] space-y-4 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
            {/* Progress */}
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[3px_3px_0px_0px_var(--border)]">
              <p className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)] text-[color:var(--text-faint)]">Progress</p>
              <p className="mt-1 text-sm font-bold text-[color:var(--text)]">
                {currentPosition} of {questions.length}
              </p>
              <div className="mt-2 h-2 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg)]">
                <div
                  className="h-full bg-[var(--neo-green)] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question list */}
            <nav className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-3 shadow-[3px_3px_0px_0px_var(--border)]" aria-label="Questions">
              <p className="px-2 pb-2.5 text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)] text-[color:var(--text-faint)]">
                All Questions
              </p>
              <div className="space-y-0.5">
                {questions.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/quiz/${item.slug}#${item.index}`}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-colors ${
                      slug === item.slug
                        ? 'bg-[var(--brand)] text-black'
                        : 'text-[color:var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-black'
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg)] text-[10px] font-bold text-[color:var(--text-faint)]">
                      {item.index}
                    </span>
                    <span className="line-clamp-2 leading-snug">{item.title}</span>
                    <span className={`ml-auto shrink-0 border-2 px-2 py-0.5 text-[10px] font-bold uppercase ${IMPORTANCE_BADGE[item.importance] || 'border-[var(--border)] text-[color:var(--text-faint)]'}`}>
                      {item.importance?.[0]}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* ── Main content ───────────────────────────────── */}
        <main className="min-w-0">
          {/* Top nav */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <Link
              href="/quiz"
              className="focus-ring flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-bold font-[family-name:var(--font-display)] text-[color:var(--text-muted)] shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] hover:text-[color:var(--text)]"
            >
              <ChevronLeft size={14} />
              Back to Questions
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={prevQuestion ? `/quiz/${prevQuestion.slug}#${prevQuestion.index}` : '#'}
                className={`focus-ring flex items-center gap-1 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-bold transition-all ${
                  prevQuestion ? 'text-[color:var(--text-muted)] shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] hover:text-[color:var(--text)]' : 'pointer-events-none opacity-40 text-[color:var(--text-faint)]'
                }`}
                aria-disabled={!prevQuestion}
              >
                <ChevronLeft size={14} />
                Prev
              </Link>
              <span className="text-xs font-bold text-[color:var(--text-faint)]">
                {currentPosition}/{questions.length}
              </span>
              <Link
                href={nextQuestion ? `/quiz/${nextQuestion.slug}#${nextQuestion.index}` : '#'}
                className={`focus-ring flex items-center gap-1 border-2 border-[var(--border)] px-3 py-2 text-xs font-bold transition-all ${
                  nextQuestion ? 'bg-[var(--brand)] text-black shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)]' : 'pointer-events-none opacity-40 bg-[var(--bg-elevated)] text-[color:var(--text-faint)]'
                }`}
                aria-disabled={!nextQuestion}
              >
                Next
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-5 h-2 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg)]">
            <div
              className="h-full bg-[var(--neo-green)] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Meta cards */}
          <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[2px_2px_0px_0px_var(--border)]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Section</p>
              <p className="mt-1 text-sm font-bold text-[color:var(--text)]">{questionData.section || 'General'}</p>
            </div>
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[2px_2px_0px_0px_var(--border)]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Priority</p>
              <span className={`mt-1 inline-flex border-2 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest ${IMPORTANCE_BADGE[questionData.importance] || 'border-[var(--border)] text-[color:var(--text-muted)]'}`}>
                {capitalizeWord(questionData.importance || 'medium')}
              </span>
            </div>
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[2px_2px_0px_0px_var(--border)]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Difficulty</p>
              <span className={`mt-1 inline-flex border-2 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest ${DIFFICULTY_BADGE[questionData.difficulty] || 'border-[var(--border)] text-[color:var(--text-muted)]'}`}>
                {capitalizeWord(questionData.difficulty || 'medium')}
              </span>
            </div>
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[2px_2px_0px_0px_var(--border)]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Duration</p>
              <p className="mt-1 text-sm font-bold text-[color:var(--text)]">{questionData.duration || 5} min</p>
            </div>
          </div>

          {/* Mobile back link */}
          <div className="mb-5 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[2px_2px_0px_0px_var(--border)] lg:hidden">
            <Link href="/quiz" className="text-sm font-bold text-[color:var(--brand)]">
              Open Full Question Library
            </Link>
          </div>

          {/* Article */}
          <article className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[4px_4px_0px_0px_var(--border)] sm:p-8">
            <div className="mb-6 border-b-2 border-[var(--border)] pb-6">
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                {frontmatter?.title || questionData.title || 'Interview Question'}
              </h1>

              {questionData.description && (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--text-muted)]">
                  {questionData.description}
                </p>
              )}

              {questionData.topics?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {questionData.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex border-2 border-[var(--border)] bg-[var(--neo-blue)] px-2.5 py-1 text-xs font-bold text-black"
                    >
                      {capitalizeWord(topic)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="quiz-prose">
              {content}
            </div>
          </article>

          {/* Prev / Next footer */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={prevQuestion ? `/quiz/${prevQuestion.slug}#${prevQuestion.index}` : '#'}
              className={`border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm shadow-[2px_2px_0px_0px_var(--border)] transition-all ${
                prevQuestion ? 'hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)]' : 'pointer-events-none opacity-40'
              }`}
              aria-disabled={!prevQuestion}
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Previous</p>
              <p className="mt-1 text-sm font-bold text-[color:var(--text)]">
                {prevQuestion ? prevQuestion.title : 'No previous question'}
              </p>
            </Link>
            <Link
              href={nextQuestion ? `/quiz/${nextQuestion.slug}#${nextQuestion.index}` : '#'}
              className={`border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-right text-sm shadow-[2px_2px_0px_0px_var(--border)] transition-all ${
                nextQuestion ? 'hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)]' : 'pointer-events-none opacity-40'
              }`}
              aria-disabled={!nextQuestion}
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-[color:var(--text-faint)]">Next</p>
              <p className="mt-1 text-sm font-bold text-[color:var(--text)]">
                {nextQuestion ? nextQuestion.title : 'No next question'}
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SlugPage;
