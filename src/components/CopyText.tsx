import { Tooltip } from '@chakra-ui/react'
import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import { JSX } from 'react'

type Props = {
  hasCopied: boolean
  onCopy: any
}

export const CopyText: React.FC<Props> = ({
  hasCopied,
  onCopy,
}): JSX.Element => {
  return (
    <>
      {hasCopied ? (
        <Tooltip
          hasArrow
          placement="top"
          bg="green.100"
          color="black"
          defaultIsOpen={true}
          label="Copied!!"
        >
          <CheckIcon ml={2} w={6} h={6} color="green.500" />
        </Tooltip>
      ) : (
        <CopyIcon
          ml={2}
          w={6}
          h={6}
          color="blue.300"
          cursor="pointer"
          onClick={onCopy}
        />
      )}
    </>
  )
}

export default CopyText
