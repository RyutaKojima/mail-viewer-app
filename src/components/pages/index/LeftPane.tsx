import React, { useRef } from 'react'
import { Box, Input, Textarea } from '@chakra-ui/react'
import { useAppToast } from 'src/hooks/useAppToast'

type Props = {
  inputRawMail: string
  onChange: (newValue: string) => void
  onAddFiles: (newMailRaws: string[]) => void
}

export const LeftPane: React.FC<Props> = ({
  inputRawMail,
  onChange,
  onAddFiles,
}): JSX.Element => {
  const { toastError } = useAppToast()

  const refFile = useRef(null)

  const clearInputFile = () => {
    refFile.current.value = null
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value

    onChange(inputValue)
  }

  const handleLoadFiles = async (
    files: FileList | null,
    handleLoaded: (inputValue: string) => void,
    handleAddFiles: (inputValues: string[]) => void
  ) => {
    if (files === null) {
      clearInputFile()
      return
    }

    const { readMailRaws, hasError } = await readFiles(files)

    if (hasError) {
      toastError(
        'アップロードエラー',
        'アップロード可能なのは.emlファイルのみです'
      )
    }

    const mailsWithoutEmpty = readMailRaws.filter((mailRaw) => mailRaw !== '')

    if (mailsWithoutEmpty.length === 1) {
      handleLoaded(mailsWithoutEmpty[0])
    } else {
      handleAddFiles(mailsWithoutEmpty)
    }

    clearInputFile()
  }

  const readFiles = async (files: FileList | null) => {
    const readMailRaws = []
    let hasError = false

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      try {
        const mailRaw = await readFile(file)
        readMailRaws.push(mailRaw)
      } catch (err) {
        readMailRaws.push('')
        hasError = true
      }
    }

    return { readMailRaws, hasError }
  }

  const readFile = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file.name.includes('.eml')) {
        reject(new Error('アップロード可能なのは.emlファイルのみです'))
        return
      }

      const fileReader = new FileReader()

      fileReader.onload = () => {
        const inputValue = String(fileReader.result)
        resolve(inputValue)
      }

      fileReader.readAsText(file)
    })
  }

  const handleChangeFile = (e) => {
    e.preventDefault()

    handleLoadFiles(e.target?.files, onChange, onAddFiles)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    handleLoadFiles(e.dataTransfer?.files, onChange, onAddFiles)
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
        multiple={true}
        onChange={handleChangeFile}
        ref={refFile}
        h="40px"
        p={1}
      />
    </Box>
  )
}
