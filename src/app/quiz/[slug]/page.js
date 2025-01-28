import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import React from 'react';

import { codeToHtml } from 'shiki'
import questions from '../quiz.json';
import Link from 'next/link';


// Helper function to get the title and description based on the slug
function getQuestionDataBySlug(slug) {
    return questions.find((question) => question.slug === slug);
}

export async function generateMetadata({ params }) {
    const { slug } = params;

    const siteUrl = `https://devpro.in/quiz/${slug}`;

    const questionData = getQuestionDataBySlug(slug); // Fetch data based on slug

    if (!questionData) {
        return {
            title: 'Question not found',
            description: 'No description available for this question.',
        };
    }

    return {
        title: questionData.title,
        description: questionData.description,

        openGraph: {
            title: questionData.title,
            description: questionData.description || 'No description available.',
            url: siteUrl,
            type: 'article', // Type can be 'article', 'website', etc.
            images: [
                {
                    url: '/seo-icon.svg', // Replace with actual image URL
                    width: 1200,
                    height: 630,
                    alt: `${questionData.title}`,
                },
            ],
        },

        // Twitter Card Meta Tags
        twitter: {
            card: 'summary_large_image', // Use 'summary' for smaller card, 'summary_large_image' for large image
            title: questionData.title,
            description: questionData.description || 'Front End Developer Interview Preparation',
            images: ['/seo-icon.svg'], // Replace with actual image URL
        },
    };
}
// Shiki-based syntax highlighting component
const CodeBlock = async ({ children, className }) => {
    const out = await codeToHtml(children.trim(), {
        lang: 'js',
        theme: 'github-dark'
    })

    return <div dangerouslySetInnerHTML={{ __html: out }} />
};

export async function generateStaticParams() {
    // const { slug } = params;
    // const res = await fetch(`https://raw.githubusercontent.com/yangshun/top-javascript-interview-questions/refs/heads/main/questions/${slug}/en-US.mdx`);
    // const data = await res.text();
    // return { data }
    const data = questions.map(item => ({ slug: item.slug }))
    return data;
}

const SlugPage = async ({ params }) => {
    const { slug } = params;

    const res = await fetch(`https://raw.githubusercontent.com/yangshun/top-javascript-interview-questions/refs/heads/main/questions/${slug}/en-US.mdx`);
    const data = await res.text();

    // Compile MDX, passing in the custom `CodeBlock` component
    const { content, frontmatter } = await compileMDX({
        source: data,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
        components: {
            pre: (props) => {
                // Render the pre element with the code block inside
                const codeElement = React.Children.toArray(props.children).find(child => {
                    return React.isValidElement(child) && child.type === 'code';
                });

                // Only highlight if we find a code block
                return (
                    <div className="overflow-auto">
                        {codeElement ? React.cloneElement(codeElement, { className: codeElement.props.className }) : props.children}
                    </div>
                );
            },
            code: ({ className, children }) => {
                // Do not apply highlighting for inline code
                if (!className) {
                    return <code>{children}</code>;
                }
                // If we have a className, it indicates block code (e.g., `language-js`)
                return <CodeBlock className={className} children={children} />;
            },
        },
    });

    // Calculate the current question index
    const currentIndex = questions.findIndex((item) => item.slug === slug);

    // Determine next and previous question slugs
    const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
    const nextQuestion = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;


    return (
        <div className={`flex h-screen`} style={{ height: 'calc(100vh - 106px)' }}>
            {/* Left Navigation */}
            <nav className="w-1/4 p-4 border-r overflow-y-auto hidden md:block sticky top-0">
                <div className="space-y-2">
                    {questions.map((item) => (
                        <div key={item.slug} id={item.index}>
                            <Link

                                href={`/quiz/${item.slug}#${item.index}`}
                                className={`block p-2 rounded text-gray-700 hover:text-white hover:bg-indigo-300 transition-colors duration-200
                                    ${slug === item.slug ? 'bg-indigo-400 text-white font-semibold' : 'hover:text-white hover:bg-indigo-300'} 
                                transition-colors duration-200`}
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Right Content */}
            <main className="flex-1 py-4 px-8 overflow-y-auto">
                <div className="prose md:px-8">
                    <h1>{frontmatter?.title || 'Default Title'}</h1>
                    {content}
                </div>

                {/* Responsive Navigation Widget */}
                <div className={`w-auto 
                        fixed bottom-0 left-0 bottom-12 left-auto right-4 z-50 
                        bg-white dark:bg-neutral-900 border-t border rounded-lg 
                        border-neutral-200 dark:border-neutral-800 shadow-lg`}>
                    <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
                        {/* Previous Button */}
                        <Link
                            href={prevQuestion ? `/quiz/${prevQuestion.slug}#${prevQuestion.index}` : "#"}
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${prevQuestion
                                ? 'text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                : 'text-neutral-400 cursor-not-allowed'
                                }`}
                            aria-disabled={!prevQuestion}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5">
                                <path d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.636L15.778 7.05L10.828 12Z"></path>
                            </svg>
                        </Link>
                        {/* Active Question Indicator */}
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {currentIndex + 1} / {questions.length}
                        </span>
                        {/* Next Button */}
                        <Link
                            href={nextQuestion ? `/quiz/${nextQuestion.slug}#${nextQuestion.index}` : "#"}
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${nextQuestion
                                ? 'text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                : 'text-neutral-400 cursor-not-allowed'
                                }`}
                            aria-disabled={!nextQuestion}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <path d="M13.172 12L8.222 7.05L9.636 5.636L16 12L9.636 18.364L8.222 16.95L13.172 12Z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SlugPage;
