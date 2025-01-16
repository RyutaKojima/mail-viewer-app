import { Tag } from '@chakra-ui/react'
import { JSX, ReactNode } from 'react'

type Props = {
  colorScheme?:
    | 'whiteAlpha'
    | 'blackAlpha'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'linkedin'
    | 'facebook'
    | 'messenger'
    | 'whatsapp'
    | 'twitter'
    | 'telegram'
    | null
  size?: 'sm' | 'md' | 'lg' | null
  children: ReactNode
}

export const TagLabel: React.FC<Props> = ({
  colorScheme = 'green',
  size = 'sm',
  children,
}): JSX.Element => {
  return (
    <Tag size={size} variant="outline" colorScheme={colorScheme}>
      {children}
    </Tag>
  )
}

export default TagLabel
