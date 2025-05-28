export async function loadMDXContent(filePath: string) {
    try {
        // Remove .md extension and add .mdx, then import dynamically
        const mdxPath = filePath.replace('.md', '.mdx')

        // Dynamic import based on the file path
        if (mdxPath.startsWith('projects/')) {
            const fileName = mdxPath.replace('projects/', '')
            const MDXContent = await import(`../content/projects/${fileName}`)
            return MDXContent.default
        } else if (mdxPath.startsWith('experiences/')) {
            const fileName = mdxPath.replace('experiences/', '')
            const MDXContent = await import(`../content/experiences/${fileName}`)
            return MDXContent.default
        } else if (mdxPath.startsWith('achievements/')) {
            const fileName = mdxPath.replace('achievements/', '')
            const MDXContent = await import(`../content/achievements/${fileName}`)
            return MDXContent.default
        }

        return null
    } catch (error) {
        console.warn(`Could not load MDX file: ${filePath}`, error)
        return null
    }
}
