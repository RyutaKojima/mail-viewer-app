import Head from 'next/head'
import { Box, Center, chakra, Grid, Textarea } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import React from 'react'
import dynamic from 'next/dynamic'

const MailParserView = dynamic(() => import('../components/MailParserView'), {
  ssr: false,
})

export const Index = (): JSX.Element => {
  const [value, setValue] = React.useState('')

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <Box bg="gray.700" color="gray.200" p="2" h="100%" minH="100vh">
      <Head>
        <title>Mail Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <chakra.header p="2">
        <Center>
          <chakra.h1>
            <EmailIcon />
            Mail Viewer
          </chakra.h1>
        </Center>
      </chakra.header>

      <main>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box
            w="100%"
            minH="200px"
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder="ここにメールデータを入力"
              w="100%"
              h="100%"
              border="none"
            />
          </Box>

          <Box
            w="100%"
            minH="200px"
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <MailParserView mail={value} />
          </Box>
        </Grid>
      </main>

      <chakra.footer mt="4" p="2">
        <Center>
          <a
            href="https://github.com/RyutaKojima/mail-viewer-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by RyutaKojima
          </a>
        </Center>
      </chakra.footer>
    </Box>
  )
}

export default Index
