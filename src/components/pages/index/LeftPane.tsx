import React, { useRef } from 'react'
import { Box, Input, Textarea, useToast } from '@chakra-ui/react'

type Props = {
  inputRawMail: string
  onChange: (newValue: string) => void
}

export const LeftPane: React.FC<Props> = ({
  inputRawMail,
  onChange,
}): JSX.Element => {
  const toast = useToast()

  const refFile = useRef(null)

  const clearInputFile = () => {
    refFile.current.value = null
  }

  const toastUploadError = () => {
    toast({
      title: 'アップロードエラー',
      description: 'アップロード可能なのは.emlファイルを１ファイルのみです',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value

    onChange(inputValue)
  }

  const readFile = (
    files: File | null,
    handleLoaded: (inputValue: string) => void
  ) => {
    if (files?.length !== 1) {
      toastUploadError()
      return
    }

    const targetFile = files[0]
    if (!targetFile.name.includes('.eml')) {
      toastUploadError()
      return
    }

    const fr = new FileReader()
    fr.readAsText(targetFile)
    fr.onload = function () {
      const inputValue = String(fr.result)
      handleLoaded(inputValue)
      clearInputFile()
    }
  }

  const handleChangeFile = (e) => {
    e.preventDefault()

    const files = e.target?.files

    readFile(files, (inputValue) => onChange(inputValue))
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const files = e.dataTransfer?.files

    readFile(files, (inputValue) => onChange(inputValue))
  }

  return (
    <Box
      w="100%"
      minH="200px"
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Textarea
        value={inputRawMail}
        onChange={handleInputChange}
        onDropCapture={handleDrop}
        placeholder="メールデータを入力 OR .emlファイルをドロップ"
        w="100%"
        h="calc(100% - 48px)"
        mb="8px"
        borderWidth="1px"
      />

      <Input
        type="file"
        onChange={handleChangeFile}
        ref={refFile}
        h="40px"
        p={1}
      />
    </Box>
  )
}
