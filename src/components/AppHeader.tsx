import React, { JSX } from 'react'
import { Center, chakra, Icon } from '@chakra-ui/react'
import { MdEmail } from 'react-icons/md'

export const AppHeader: React.FC = (): JSX.Element => {
  return (
    <chakra.header p="2" bg="gray.900">
      <Center>
        <chakra.h1 fontSize="3xl" display="flex" alignItems="center">
          <Icon mr={2}>
            <MdEmail />
          </Icon>
          Mail Viewer
        </chakra.h1>
      </Center>
    </chakra.header>
  )
}
