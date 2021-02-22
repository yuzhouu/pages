export type SortPageParam = {
  frontMatter?: {
    date?: string | number
  }
}

export default (a: SortPageParam, b: SortPageParam) => {
  if (!a.frontMatter || !a.frontMatter.date) return -1
  if (!b.frontMatter || !b.frontMatter.date) return -1
  return new Date(a.frontMatter.date) > new Date(b.frontMatter.date) ? -1 : 1
}
