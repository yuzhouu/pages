export default function getTags(page: { matterData?: { tag?: string } }) {
  if (!page.matterData) {
    return []
  }
  const tags = page.matterData.tag || ''
  return tags.split(',').map((s) => s.trim())
}
