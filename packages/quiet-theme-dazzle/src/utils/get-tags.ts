export default function getTags(page: { frontMatter?: { tag?: string } }) {
  if (!page.frontMatter) {
    return []
  }
  const tags = page.frontMatter.tag || ''
  return tags.split(',').map((s) => s.trim())
}
