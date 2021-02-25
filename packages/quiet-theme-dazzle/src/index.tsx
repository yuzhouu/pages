import React from 'react'

import Layout from './layout'
import { ThemeConfig, PageMeta } from './types'
import CurrentPageContext from './current-page-context'

export default (currentPage: PageMeta, _config: Omit<ThemeConfig, 'footer'>) => {
  const config: ThemeConfig = Object.assign(
    {
      footer: (
        <small style={{ display: 'block', marginTop: '8rem' }}>CC BY-NC 4.0 2021 © Yu Zhou.</small>
      ),
    },
    _config
  )

  return (props: React.PropsWithChildren<{ tagName?: string; [key: string]: any }>) => {
    return (
      <CurrentPageContext.Provider value={currentPage}>
        <Layout
          config={config}
          matterData={{ ...currentPage.matterData }}
          filename={currentPage.filename}
          {...props}
        />
      </CurrentPageContext.Provider>
    )
  }
}
