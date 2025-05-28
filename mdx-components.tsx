import React from 'react'

type MDXComponents = {
    [element: string]: React.ComponentType<any>
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
    return {
        // Override default HTML elements with custom styling
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-medium mt-5 mb-2">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>,
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-4">{children}</li>,
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
        code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
            </pre>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
                {children}
            </blockquote>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-gray-300 dark:border-gray-600 my-8" />,
        table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-gray-300 dark:border-gray-600">{children}</tr>,
        th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold border-r border-gray-300 dark:border-gray-600 last:border-r-0">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="px-4 py-2 border-r border-gray-300 dark:border-gray-600 last:border-r-0">
                {children}
            </td>
        ),
        ...components,
    }
}
