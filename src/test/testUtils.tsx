import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/theme'

const Providers = ({ children }) => {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
