import { Page, PageDir } from '@yuzhouu/quiet'

// BFS traverse the page map tree
export default function traverse(pageList: Page[], matcher: (param: Page) => void): Page | null {
  for (let i = 0; i < pageList.length; i++) {
    if (Boolean(matcher(pageList[i]))) {
      return pageList[i]
    }
  }
  for (let i = 0; i < pageList.length; i++) {
    if ((pageList[i] as PageDir).children) {
      const matched = traverse((pageList[i] as PageDir).children, matcher)
      if (matched) {
        return matched
      }
    }
  }
  return null
}
