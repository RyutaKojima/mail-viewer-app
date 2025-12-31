import { Tooltip } from '@/components/ui/tooltip'
import { FaCheck, FaCopy } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'
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
          content="Copied!!"
          positioning={{ placement: "top" }}
          defaultOpen={true}
        >
          <Icon ml={2} w={6} h={6} color="green.500">
            <FaCheck />
          </Icon>
        </Tooltip>
      ) : (
        <Icon
          ml={2}
          w={6}
          h={6}
          color="blue.300"
          cursor="pointer"
          onClick={onCopy}
        >
          <FaCopy />
        </Icon>
      )}
    </>
  )
}

export default CopyText
