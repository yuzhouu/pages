import { PageMeta } from './types'
import React, { useContext } from 'react'

const CurrentPageContext = React.createContext<PageMeta | null>(null)

export default CurrentPageContext

export const useCurrentPageContext = () => useContext(CurrentPageContext)
