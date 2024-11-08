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

    return (
        <div className="flex h-screen">
            {/* Left Navigation */}
            <nav className="w-1/4 p-4 border-r overflow-y-scroll hidden md:block">
                <div className="space-y-2">
                    {questions.map((item) => (
                        <div key={item.slug}>
                            <Link
                                href={`/quiz/${item.slug}`}
                                className="block p-2 rounded text-gray-700 hover:text-white hover:bg-indigo-400 transition-colors duration-200"
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
            </main>
        </div>
    );
};

export default SlugPage;
