import React from 'react'

export default function getTitle(children: React.ReactNode) {
  const nodes = React.Children.toArray(children)
  // todo: fix ts type error porps not exits
  const titleEl = nodes.find((child) => (child as any).props.mdxType === 'h1')
  return [
    titleEl as React.ReactElement<{ mdxType: 'h1'; [key: string]: any }> | undefined,
    nodes.filter((node) => node !== titleEl),
  ]
}
