import React from 'react'
import { Box, Textarea, useToast } from '@chakra-ui/react'

type Props = {
  inputRawMail: string
  onChange: (newValue: string) => void
}

export const LeftPane: React.FC<Props> = ({
  inputRawMail,
  onChange,
}): JSX.Element => {
  const toast = useToast()

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

  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files.length !== 1) {
      toastUploadError()
      return
    }

    const targetFile = e.dataTransfer.files[0]
    if (!targetFile.name.includes('.eml')) {
      toastUploadError()
      return
    }

    const fr = new FileReader()
    fr.readAsText(targetFile)
    fr.onload = function () {
      const inputValue = String(fr.result)
      onChange(inputValue)
    }
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
        h="100%"
        border="none"
      />
    </Box>
  )
}
