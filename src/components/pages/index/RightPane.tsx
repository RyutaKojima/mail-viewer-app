import React from 'react'
import { Box } from '@chakra-ui/react'

import dynamic from 'next/dynamic'

const MailParserView = dynamic(() => import('./MailParserView'), {
  ssr: false,
})

type Props = {
  inputRawMail: string
}

export const RightPane: React.FC<Props> = ({ inputRawMail }): JSX.Element => {
  return (
    <Box
      w="100%"
      minH="200px"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <MailParserView mail={inputRawMail} />
    </Box>
  )
}
