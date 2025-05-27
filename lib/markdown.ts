import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark()
        .use(gfm) // GitHub Flavored Markdown support
        .use(html, { sanitize: false })
        .process(markdown)

    return result.toString()
}

export async function loadMarkdownContent(filePath: string): Promise<string | null> {
    try {
        const fs = await import('fs/promises')
        const path = await import('path')

        const fullPath = path.join(process.cwd(), 'content', filePath)
        const fileContents = await fs.readFile(fullPath, 'utf8')

        return await markdownToHtml(fileContents)
    } catch (error) {
        console.warn(`Could not load markdown file: ${filePath}`, error)
        return null
    }
}
