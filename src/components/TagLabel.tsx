import { Tag } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  size?: string | null
  children: ReactNode
}

export const TagLabel: React.FC<Props> = ({
  size = 'sm',
  children,
}): JSX.Element => {
  return (
    <Tag size={size} variant="outline" colorScheme="green">
      {children}
    </Tag>
  )
}

export default TagLabel
