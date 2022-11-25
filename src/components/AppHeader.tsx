import React from 'react'
import { Center, chakra } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

export const AppHeader: React.FC = (): JSX.Element => {
  return (
    <chakra.header p="2">
      <Center>
        <chakra.h1>
          <EmailIcon />
          Mail Viewer
        </chakra.h1>
      </Center>
    </chakra.header>
  )
}
