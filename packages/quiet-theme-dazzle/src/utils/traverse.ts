import { Page, PageDir } from '@yuzhouu/quiet'

// BFS traverse the page map tree
export default function traverse(pageMap: Page[], matcher: (param: Page) => void): Page | null {
  for (let i = 0; i < pageMap.length; i++) {
    if (Boolean(matcher(pageMap[i]))) {
      return pageMap[i]
    }
  }
  for (let i = 0; i < pageMap.length; i++) {
    if ((pageMap[i] as PageDir).children) {
      const matched = traverse((pageMap[i] as PageDir).children, matcher)
      if (matched) {
        return matched
      }
    }
  }
  return null
}
