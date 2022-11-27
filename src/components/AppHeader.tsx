import React from 'react'
import { Center, chakra } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

export const AppHeader: React.FC = (): JSX.Element => {
  return (
    <chakra.header p="2" bg="gray.900">
      <Center>
        <chakra.h1 fontSize="3xl">
          <EmailIcon mr={2} />
          Mail Viewer
        </chakra.h1>
      </Center>
    </chakra.header>
  )
}
