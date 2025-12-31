import React, { JSX } from 'react'
import {
  Box,
  Grid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion"

import { useMailParse } from '@/hooks/useMailParse'
import MailAddressView from '@/components/MailAddressView'
import { LeftPane } from '@/components/pages/index/LeftPane'
import { RightPane } from '@/components/pages/index/RightPane'

type Props = {
  inputRawMail: string
  accordionValue: string
  onChange: (newValue: string) => void
  onAddFiles: (newMailRaws: string[]) => void
  onRemoveItem: () => void
}

export const PageAccordionItem: React.FC<Props> = ({
  inputRawMail,
  accordionValue,
  onChange,
  onAddFiles,
  onRemoveItem,
}): JSX.Element => {
  const { errors, mailInfo } = useMailParse(inputRawMail)
  // console.log(mailInfo)

  return (
    <AccordionItem value={accordionValue}>
      <AccordionItemTrigger>
        {mailInfo?.subject && <span>{mailInfo?.subject}</span>}

        {mailInfo?.to && (
          <Box ml={2} bg="black">
            <MailAddressView mailAddress={mailInfo?.to[0]} />
          </Box>
        )}
        <Spacer />
        <Text
          color="red"
          onClick={(e) => {
            e.stopPropagation()
            onRemoveItem()
          }}
        >
          ×
        </Text>
      </AccordionItemTrigger>
      <AccordionItemContent pb={2} w="100%">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <LeftPane
            inputRawMail={inputRawMail}
            onChange={(newValue) => onChange(newValue)}
            onAddFiles={(newMailRaws) => onAddFiles(newMailRaws)}
          />
          <RightPane
            inputRawMail={inputRawMail}
            mailInfo={mailInfo}
            errors={errors}
          />
        </Grid>
      </AccordionItemContent>
    </AccordionItem>
  )
}

export default PageAccordionItem
