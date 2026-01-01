import { Tag } from '@/components/ui/tag'
import { JSX, ReactNode } from 'react'

type Props = {
  colorScheme?:
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
    <Tag size={size} variant="outline" colorPalette={colorScheme ?? 'green'}>
      {children}
    </Tag>
  )
}

export default TagLabel
