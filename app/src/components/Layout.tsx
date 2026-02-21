import { type ReactNode } from 'react'

interface LayoutProps {
  title: string
  navigation: ReactNode
  children: ReactNode
}

export function Layout({ title, navigation, children }: LayoutProps) {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif', padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <h1>{title}</h1>
        {navigation}
      </header>
      {children}
    </main>
  )
}
