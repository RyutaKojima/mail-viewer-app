import Head from 'next/head'
import {
  Box,
  Button,
  Center,
  chakra,
  Spacer,
} from '@chakra-ui/react'
import { AccordionRoot } from '@/components/ui/accordion'
import React, { JSX } from 'react'
import dynamic from 'next/dynamic'

import { useAppToast } from '@/hooks/useAppToast'
import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'

const PageAccordionItem = dynamic(
  () => import('src/components/pages/index/PageAccordionItem'),
  {
    ssr: false,
  },
)

export const Index = (): JSX.Element => {
  const { toastSuccess } = useAppToast()
  const [mailRaws, setMailRaws] = React.useState<string[]>([''])
  const [accordionOpens, setAccordionOpens] = React.useState<string[]>(['0'])

  const handleInputChange = (targetIndex: number, newValue: string) => {
    setMailRaws(
      mailRaws.map((mailRaw, index) =>
        index === targetIndex ? newValue : mailRaw,
      ),
    )
  }

  const handleAddFiles = (inputMailRaws: string[]) => {
    setMailRaws([...mailRaws, ...inputMailRaws])

    toastSuccess(
      '複数取り込み完了',
      `${inputMailRaws.length}ファイルを末尾に追加しました`,
    )
  }

  const handleAddField = () => {
    setAccordionOpens([...accordionOpens, String(mailRaws.length)])
    setMailRaws([...mailRaws, ''])
  }

  const handleDeleteField = (targetIndex) => {
    if (mailRaws.length <= 1) {
      setAccordionOpens(['0'])
      setMailRaws([''])
      return
    }

    // We are removing an item at targetIndex.
    // The items after targetIndex will shift down (index - 1).
    // We need to adjust accordionOpens accordingly.
    // However, since we are using index as string as value, we need to be careful.

    // Simplification: Just reset open state or keep it simple.
    // For now, let's just update mailRaws and let user re-open if needed or try to preserve logic.
    // If we remove index 1, index 2 becomes 1.
    // If '2' was open, '1' should now be open? Or '2' (which is now old '3')?

    // Let's just remove the deleted index from opens and shift others.
    const newOpens = accordionOpens
       .filter(v => parseInt(v) !== targetIndex)
       .map(v => {
           const n = parseInt(v);
           return n > targetIndex ? String(n - 1) : v;
       });

    setAccordionOpens(newOpens)
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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AppHeader />

      <chakra.main p={4} w="100%">
        <AccordionRoot
          value={accordionOpens}
          multiple
          w="100%"
          onValueChange={(e) => setAccordionOpens(e.value)}
        >
          {mailRaws.map((mailRaw, index) => (
            <PageAccordionItem
              inputRawMail={mailRaw}
              accordionValue={String(index)}
              key={`mails-${index}`}
              onRemoveItem={() => handleDeleteField(index)}
              onChange={(newValue) => handleInputChange(index, newValue)}
              onAddFiles={(newMailRaws) => handleAddFiles(newMailRaws)}
            />
          ))}
        </AccordionRoot>

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
