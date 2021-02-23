import { PageMeta } from './types'
import React, { useContext } from 'react'

const MetaContext = React.createContext<PageMeta | null>(null)

export default MetaContext

export const useMetaContext = () => useContext(MetaContext)
