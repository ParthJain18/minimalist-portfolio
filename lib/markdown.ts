import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(markdown)

    return result.toString()
}

export async function loadMarkdownContent(filePath: string): Promise<string | null> {
    try {
        if (typeof window === 'undefined') {
            const fs = await import('fs/promises')
            const path = await import('path')

            const fullPath = path.join(process.cwd(), 'public', 'content', filePath)
            const fileContents = await fs.readFile(fullPath, 'utf8')
            return await markdownToHtml(fileContents)
        } else {
            const response = await fetch(`/content/${filePath}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const fileContents = await response.text()
            return await markdownToHtml(fileContents)
        }
    } catch (error) {
        console.warn(`Could not load markdown file: ${filePath}`, error)
        return null
    }
}
