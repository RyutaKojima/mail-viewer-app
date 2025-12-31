import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { system } from '@/theme'
import { Toaster } from "@/components/ui/toaster"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <Component {...pageProps} />
      <Analytics />
      <Toaster />
    </ChakraProvider>
  )
}
