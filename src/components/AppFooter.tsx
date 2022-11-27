import React from 'react'
import { Center, chakra } from '@chakra-ui/react'

export const AppFooter: React.FC = (): JSX.Element => {
  return (
    <chakra.footer mt="4" p="2" bg="gray.900">
      <Center>
        <a
          href="https://github.com/RyutaKojima/mail-viewer-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by RyutaKojima
        </a>
      </Center>
    </chakra.footer>
  )
}
