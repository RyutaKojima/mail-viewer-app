import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useAppToast = () => {
  const toast = useToast()

  const toastSuccess = (
    title: string,
    description?: string,
    options?: UseToastOptions
  ) => {
    toast({
      title,
      description,
      status: 'success',
      duration: 4000,
      isClosable: true,
      ...options,
    })
  }

  const toastError = (
    title: string,
    description?: string,
    options?: UseToastOptions
  ) => {
    toast({
      title,
      description,
      status: 'error',
      duration: 4000,
      isClosable: true,
      ...options,
    })
  }

  return { toastSuccess, toastError }
}
