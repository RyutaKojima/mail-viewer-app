import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  useClipboard,
} from '@chakra-ui/react'
import { MailInfo } from 'src/hooks/useMailParse'
import CopyText from 'src/components/CopyText'
import TagLabel from 'src/components/TagLabel'
import React from 'react'
import RichTextViewer from '../../../base/RichTextViewer'
import { StringNewlineCharacter } from '../../../../domains/StringNewlineCharacter'

type Props = {
  mailRaw: string
  mailInfo: MailInfo | null
}

export const BodyTextPlain: React.FC<Props> = ({
  mailRaw,
  mailInfo,
}): JSX.Element => {
  const [isUseRichViewer, setIsUseRichViewer] = React.useState<boolean>(false)

  const contentType = (() => {
    const regex = new RegExp(
      '^Content-Type: text/plain;\\s*\\r?\\n?\\s*charset=.*$',
      'gm',
    )
    const matches = regex.exec(mailRaw)
    return matches && matches[0]
  })()

  const contentEncoding = (() => {
    const patterns = [
      '^(?:Content-Type: text/plain;\\s*\\r?\\n?\\s*charset=.*)\\r?\\n(Content-Transfer-Encoding: .*)$',
      '^(Content-Transfer-Encoding: .*)\\r?\\n(?:Content-Type: text/plain;.*)$',
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

  const { value, hasCopied, onCopy } = useClipboard(mailInfo?.text ?? '')

  const breakCode = StringNewlineCharacter(value)

  return (
    <Box mx={5} my={2}>
      text/plain
      <CopyText hasCopied={hasCopied} onCopy={onCopy} />
      <div>
        {(() => contentType && <TagLabel>{contentType}</TagLabel>)()}
        {(() => contentEncoding && <TagLabel>{contentEncoding}</TagLabel>)()}
        <TagLabel>{breakCode}</TagLabel>
      </div>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          改行コード表示
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={isUseRichViewer}
          onChange={(event) => setIsUseRichViewer(event.target.checked)}
        />
      </FormControl>
      {(() =>
        isUseRichViewer ? (
          <RichTextViewer value={value} />
        ) : (
          <Textarea
            value={value}
            minH="400px"
            width="full"
            padding={2}
            isReadOnly={true}
          />
        ))()}
    </Box>
  )
}
