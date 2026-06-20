import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'SysHub — Hub do Servidor',
  description: 'Hub completo de gerenciamento do servidor de desenvolvimento',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-dark-bg">
        <Sidebar />
        <main className="min-h-screen pt-16 lg:pt-6 lg:ml-64 p-4 lg:p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
