import React from 'react'
import { Box } from '@chakra-ui/react'

type MailAddress = {
  name: string
  address: string
}

type Props = {
  mailAddress: MailAddress
}

export const MailAddressView: React.FC<Props> = ({
  mailAddress,
}): JSX.Element => {
  return (
    <Box>
      {mailAddress.name}
      &lt; {mailAddress.address} &gt;
    </Box>
  )
}

export default MailAddressView
