import { Lexend } from 'next/font/google'
import './Globals.css'

const lexend = Lexend({
  subsets: ['latin']
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={lexend.className}>{children}</body>
    </html>
  )
}
