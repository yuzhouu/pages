export type SortPageParam = {
  matterData?: {
    date?: string | number
  }
}

export default (a: SortPageParam, b: SortPageParam): number => {
  if (!a.matterData || !a.matterData.date) return -1
  if (!b.matterData || !b.matterData.date) return -1
  return new Date(a.matterData.date) > new Date(b.matterData.date) ? -1 : 1
}
