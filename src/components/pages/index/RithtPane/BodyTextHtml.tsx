import { Box, Textarea, useClipboard } from '@chakra-ui/react'
import { MailInfo } from 'src/hooks/useMailParse'
import CopyText from 'src/components/CopyText'
import TagLabel from 'src/components/TagLabel'

type Props = {
  mailRaw: string
  mailInfo: MailInfo | null
}

export const BodyTextHtml: React.FC<Props> = ({
  mailRaw,
  mailInfo,
}): JSX.Element => {
  const contentType = (() => {
    const regex = new RegExp('^Content-Type: text/html; .*$', 'gm')
    const matches = regex.exec(mailRaw)
    return matches && matches[0]
  })()

  const contentEncoding = (() => {
    const patterns = [
      '^(?:Content-Type: text/html; .*)\\r?\\n(Content-Transfer-Encoding: .*)$',
      '^(Content-Transfer-Encoding: .*)\\r?\\n(?:Content-Type: text/html; .*)$',
    ]

    const results = patterns
      .map((pattern) => {
        const regex = new RegExp(pattern, 'gm')
        const matches = regex.exec(mailRaw)
        return matches && matches[1]
      })
      .filter((v) => v)

    return results[0] ?? null
  })()

  const { value, hasCopied, onCopy } = useClipboard(mailInfo?.html ?? '')

  return (
    <Box mx={5} my={2}>
      text/html
      <CopyText hasCopied={hasCopied} onCopy={onCopy} />
      {(() => contentType && <TagLabel>{contentType}</TagLabel>)()}
      {(() => contentEncoding && <TagLabel>{contentEncoding}</TagLabel>)()}
      <Textarea value={value} minH="400px" width="full" isReadOnly={true} />
    </Box>
  )
}
