import Head from 'next/head'
import {
  Accordion,
  Box,
  Button,
  Center,
  chakra,
  ExpandedIndex,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import dynamic from 'next/dynamic'

const PageAccordionItem = dynamic(
  () => import('../components/pages/index/PageAccordionItem'),
  {
    ssr: false,
  }
)

export const Index = (): JSX.Element => {
  const [mailRaws, setMailRaws] = React.useState<string[]>([''])
  const [accordionOpens, setAccordionOpens] = React.useState<number[]>([0])

  const handleInputChange = (targetIndex: number, newValue: string) => {
    setMailRaws(
      mailRaws.map((mailRaw, index) =>
        index === targetIndex ? newValue : mailRaw
      )
    )
  }

  const handleChangeAccordion = (expandedIndex: ExpandedIndex) => {
    setAccordionOpens(
      Array.isArray(expandedIndex) ? expandedIndex : [expandedIndex]
    )
  }

  const handleAddField = () => {
    setAccordionOpens([...accordionOpens, mailRaws.length])
    setMailRaws([...mailRaws, ''])
  }

  const handleDeleteField = (targetIndex) => {
    if (mailRaws.length <= 1) {
      setAccordionOpens([0])
      setMailRaws([''])
      return
    }

    setAccordionOpens(
      accordionOpens
        .filter((v) => v !== targetIndex)
        .map((v) => (v > targetIndex ? v - 1 : v))
    )
    setMailRaws(mailRaws.filter((_v, index) => index !== targetIndex))
  }

  return (
    <Box
      bg="gray.700"
      color="gray.200"
      h="100%"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Head>
        <title>Mail Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <chakra.main p={4} w="100%">
        <Accordion
          index={accordionOpens}
          allowMultiple
          w="100%"
          onChange={handleChangeAccordion}
        >
          {mailRaws.map((mailRaw, index) => (
            <PageAccordionItem
              inputRawMail={mailRaw}
              key={`mails-${index}`}
              onRemoveItem={() => handleDeleteField(index)}
              onChange={(newValue) => handleInputChange(index, newValue)}
            />
          ))}
        </Accordion>

        <Center mt={8}>
          <Button colorScheme="blue" onClick={handleAddField}>
            New Field
          </Button>
        </Center>
      </chakra.main>

      <Spacer />
      <AppFooter />
    </Box>
  )
}

export default Index
