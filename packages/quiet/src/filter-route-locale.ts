import { Page, PageDir } from './types'

export default function filterRouteLocale(
  pageMap: Page[],
  locale: string,
  defaultLocale?: string
): Page[] {
  const filteredPageList = []
  // We fallback to the default locale
  const fallbackPages: { [key: string]: Page | null } = {}

  for (const page of pageMap) {
    if ((page as PageDir).children) {
      filteredPageList.push({
        ...page,
        children: filterRouteLocale((page as PageDir).children, locale, defaultLocale),
      })
      continue
    }

    const localDoesMatch =
      (!page.locale && (!defaultLocale || locale === defaultLocale)) || page.locale === locale

    if (localDoesMatch) {
      fallbackPages[page.name] = null
      filteredPageList.push(page)
    } else {
      if (fallbackPages[page.name] !== null && (!page.locale || page.locale === defaultLocale)) {
        fallbackPages[page.name] = page
      }
    }
  }

  for (const name in fallbackPages) {
    if (fallbackPages[name]) {
      filteredPageList.push(fallbackPages[name]!)
    }
  }

  return filteredPageList
}
