import {
  Box,
  Textarea,
  useClipboard,
} from '@chakra-ui/react'
import { Switch } from "@/components/ui/switch"
import React, { JSX } from 'react'

import { StringNewlineCharacter } from '@/domains/StringNewlineCharacter'
import { MailInfo } from '@/hooks/useMailParse'
import CopyText from '@/components/CopyText'
import TagLabel from '@/components/TagLabel'
import RichTextViewer from '@/components/base/RichTextViewer'

type Props = {
  mailRaw: string
  mailInfo: MailInfo | null
}

export const BodyTextHtml: React.FC<Props> = ({
  mailRaw,
  mailInfo,
}): JSX.Element => {
  const [isUseRichViewer, setIsUseRichViewer] = React.useState<boolean>(false)

  const contentType = (() => {
    const regex = new RegExp(
      '^Content-Type: text/html;\\s*\\r?\\n?\\s*charset=.*$',
      'gm',
    )
    const matches = regex.exec(mailRaw)
    return matches && matches[0]
  })()

  const contentEncoding = (() => {
    const patterns = [
      '^(?:Content-Type: text/html;\\s*\\r?\\n?\\s*charset=.*$)\\r?\\n(Content-Transfer-Encoding: .*)$',
      '^(Content-Transfer-Encoding: .*)\\r?\\n(?:Content-Type: text/html;.*)$',
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

  const { value, copied, copy } = useClipboard({ value: mailInfo?.html ?? '' })

  const breakCode = StringNewlineCharacter(value)

  return (
    <Box mx={5} my={2}>
      text/html
      <CopyText hasCopied={copied} onCopy={copy} />
      <div>
        {(() => contentType && <TagLabel>{contentType}</TagLabel>)()}
        {(() => contentEncoding && <TagLabel>{contentEncoding}</TagLabel>)()}
        <TagLabel>{breakCode}</TagLabel>
      </div>
      <Box display="flex" alignItems="center" gap={2} my={2}>
        <label htmlFor="email-alerts" style={{ marginBottom: 0 }}>
          改行コード表示
        </label>
        <Switch
          id="email-alerts"
          checked={isUseRichViewer}
          onCheckedChange={(e) => setIsUseRichViewer(e.checked)}
        />
      </Box>
      {(() =>
        isUseRichViewer ? (
          <RichTextViewer value={value} />
        ) : (
          <Textarea
            value={value}
            minH="400px"
            width="full"
            padding={2}
            readOnly={true}
          />
        ))()}
    </Box>
  )
}
