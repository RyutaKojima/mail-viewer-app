import { Box } from '@chakra-ui/react'
import { v4 as uuidV4 } from 'uuid'
import TagLabel from '@/components/TagLabel'
import { JSX } from 'react'

type Props = {
  value: string
}

export const RichTextViewer: React.FC<Props> = ({ value }): JSX.Element => {
  const reducers = [
    {
      splitter: /\r\n/g,
      constantNode: {
        type: 'CRLF',
        value: '',
      },
    },
    {
      splitter: /\n/g,
      constantNode: {
        type: 'LF',
        value: '',
      },
    },
  ]

  const makeUuidKey = (): { key: string } => ({ key: uuidV4() })

  let targets: { type: 'TEXT' | 'CRLF' | 'LF'; value: string; key: string }[] =
    [
      {
        type: 'TEXT',
        value: value,
        ...makeUuidKey(),
      },
    ]
  reducers.forEach((reducer) => {
    const temporary = []
    targets.forEach((node) => {
      if (node.type !== 'TEXT') {
        temporary.push(node)
        return
      }

      const segmentedString = node.value.split(reducer.splitter)
      segmentedString.forEach((text, index) => {
        if (index !== 0) {
          temporary.push({
            ...reducer.constantNode,
            ...makeUuidKey(),
          })
        }

        if (text !== '') {
          temporary.push({
            type: 'TEXT',
            value: text,
            ...makeUuidKey(),
          })
        }
      })
    })

    targets = temporary
  })
  /*

      border-radius: var(--chakra-radii-md);
  border: 1px solid;
   */

  return (
    <Box border="1px" borderRadius="md" padding={2} fontSize="md">
      {targets.map((node) => {
        if (node.type === 'CRLF') {
          return (
            <span key={node.key}>
              <TagLabel colorScheme={'orange'}>CRLF</TagLabel>
              <br />
            </span>
          )
        }
        if (node.type === 'LF') {
          return (
            <span key={node.key}>
              <TagLabel colorScheme={'yellow'}>LF</TagLabel>
              <br />
            </span>
          )
        }

        return <span key={node.key}>{node.value}</span>
      })}
    </Box>
  )

  // const text = value.replaceAll(/\r\n/g, '__CRLF__').replaceAll(/\n/g, '__LF__')
  // return <Box>{text}</Box>
}

export default RichTextViewer
