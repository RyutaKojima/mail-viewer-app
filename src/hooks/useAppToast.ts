import { toaster } from "@/components/ui/toaster"

export interface ToastOptions {
  duration?: number;
  isClosable?: boolean;
  [key: string]: any;
}

export const useAppToast = () => {
  const toastSuccess = (
    title: string,
    description?: string,
    options?: ToastOptions,
  ) => {
    toaster.create({
      title,
      description,
      type: 'success',
      duration: 4000,
      ...options,
    })
  }

  const toastError = (
    title: string,
    description?: string,
    options?: ToastOptions,
  ) => {
    toaster.create({
      title,
      description,
      type: 'error',
      duration: 4000,
      ...options,
    })
  }

  return { toastSuccess, toastError }
}
