"use client"
import './globals.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/theme'
import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from 'notistack'

// export const metadata = {
//   title: 'TechLibrary',
//   description: 'Pide tus libros.',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>TechLibrary</title>
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
