import React from 'react'
import { Box } from '@chakra-ui/react'
import { MailAddressRecord } from '../hooks/useMailParse'

type Props = {
  mailAddress: MailAddressRecord | null
}

export const MailAddressView: React.FC<Props> = ({
  mailAddress,
}): JSX.Element => {
  return (
    <Box>
      {mailAddress?.name ?? ''}
      &lt; {mailAddress?.address ?? ''} &gt;
    </Box>
  )
}

export default MailAddressView
