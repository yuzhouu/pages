import React from 'react'

import Layout from './layout'
import { ThemeConfig, PageMeta } from './types'
import MetaContext from './meta-context'

export default (meta: PageMeta, _config: Omit<ThemeConfig, 'footer'>) => {
  const config: ThemeConfig = Object.assign(
    {
      footer: (
        <small style={{ display: 'block', marginTop: '8rem' }}>CC BY-NC 4.0 2020 © Yu Zhou.</small>
      ),
    },
    _config
  )

  return (props: React.PropsWithChildren<{ tagName?: string; [key: string]: any }>) => {
    return (
      <MetaContext.Provider value={meta}>
        <Layout config={config} matterData={{ ...meta.matterData }} {...props} />
      </MetaContext.Provider>
    )
  }
}
