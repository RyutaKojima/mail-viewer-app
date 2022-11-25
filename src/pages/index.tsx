import Head from 'next/head'
import { Box, Grid } from '@chakra-ui/react'
import React from 'react'

import { LeftPane } from '../components/pages/index/LeftPane'
import { RightPane } from '../components/pages/index/RightPane'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'

export const Index = (): JSX.Element => {
  // const toast = useToast()
  const [value, setValue] = React.useState('')

  const handleInputChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box bg="gray.700" color="gray.200" p="2" h="100%" minH="100vh">
      <Head>
        <title>Mail Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <main>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <LeftPane inputRawMail={value} onChange={handleInputChange} />

          <RightPane inputRawMail={value} />
        </Grid>
      </main>

      <AppFooter />
    </Box>
  )
}

export default Index
