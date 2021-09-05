import Head from 'next/head'
import { Box, Center, chakra, Grid, Textarea, useToast } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import React from 'react'
import dynamic from 'next/dynamic'

const MailParserView = dynamic(() => import('../components/MailParserView'), {
  ssr: false,
})

export const Index = (): JSX.Element => {
  const toast = useToast()
  const [value, setValue] = React.useState('')

  const toastUploadError = () => {
    toast({
      title: 'アップロードエラー',
      description: 'アップロード可能なのは.emlファイルを１ファイルのみです',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files.length !== 1) {
      toastUploadError()
      return
    }

    const targetFile = e.dataTransfer.files[0]
    if (!targetFile.name.includes('.eml')) {
      toastUploadError()
      return
    }

    const fr = new FileReader()
    fr.readAsText(targetFile)
    fr.onload = function () {
      setValue(String(fr.result))
    }
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
              onDropCapture={handleDrop}
              placeholder="メールデータを入力 OR .emlファイルをドロップ"
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
