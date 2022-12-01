import React from 'react'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { LeftPane } from './LeftPane'
import { RightPane } from './RightPane'
import { useMailParse } from '../../../hooks/useMailParse'
import MailAddressView from '../../MailAddressView'

type Props = {
  inputRawMail: string
  onChange: (newValue: string) => void
  onAddFiles: (newMailRaws: string[]) => void
  onRemoveItem: () => void
}

export const PageAccordionItem: React.FC<Props> = ({
  inputRawMail,
  onChange,
  onAddFiles,
  onRemoveItem,
}): JSX.Element => {
  const { errors, mailInfo } = useMailParse(inputRawMail)
  // console.log(mailInfo)

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
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
      </AccordionButton>
      <AccordionPanel pb={2} w="100%">
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
      </AccordionPanel>
    </AccordionItem>
  )
}

export default PageAccordionItem
