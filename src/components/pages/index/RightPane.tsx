import React from 'react'
import { Box } from '@chakra-ui/react'
import { MailInfo } from '../../../hooks/useMailParse'
import { MailParserView } from './MailParserView'

type Props = {
  inputRawMail: string
  mailInfo: MailInfo | null
  errors: string[]
}

export const RightPane: React.FC<Props> = ({
  inputRawMail,
  mailInfo,
  errors,
}): JSX.Element => {
  return (
    <Box
      w="100%"
      minH="200px"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <MailParserView
        mailRaw={inputRawMail}
        mailInfo={mailInfo}
        errors={errors}
      />
    </Box>
  )
}
