import {
  Box,
  Table,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"
import { JSX } from 'react'

import CopyText from '@/components/CopyText'
import { MailInfo } from '@/hooks/useMailParse'
import MailAddressView from '@/components/MailAddressView'
import { BodyTextPlain } from '@/components/pages/index/RithtPane/BodyTextPlain'
import { BodyTextHtml } from '@/components/pages/index/RithtPane/BodyTextHtml'

type Props = {
  mailRaw: string
  mailInfo: MailInfo | null
  errors: string[]
}

export const MailParserView: React.FC<Props> = ({
  mailRaw,
  mailInfo,
  errors,
}): JSX.Element => {
  const { hasCopied: hasCopiedSubject, onCopy: onCopySubject } = useClipboard(
    mailInfo?.subject ?? '',
  )

  if (!mailRaw) {
    return <Box>左ペインにメールデータを貼り付けてください</Box>
  }

  if (errors.length > 0) {
    return (
      <Table.Root>
        <Table.Caption>エラーが発生しました</Table.Caption>
        <Table.Body>
          {errors.map((error, index) => (
            <Table.Row key={`errors-${index}`}>
              <Table.Cell>{error}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  }

  return (
    <Box>
      <AccordionRoot multiple>
        <AccordionItem value="headers">
          <AccordionItemTrigger>
            <Box flex="1" textAlign="left">
              Headers
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent pb={4} overflow="auto">
            <Table.Root>
              <Table.Body>
                {mailInfo?.headers.map((header, index) => (
                  <Table.Row key={`header-${index}-${header.key}`}>
                    <Table.Cell>{header.key}</Table.Cell>
                    <Table.Cell>{header.value}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
      <Table.Root variant="outline">
        <Table.Body>
          <Table.Row>
            <Table.Cell>date</Table.Cell>
            <Table.Cell>{mailInfo?.date ?? ''}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>messageId</Table.Cell>
            <Table.Cell>{mailInfo?.messageId ?? ''}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>returnPath</Table.Cell>
            <Table.Cell>{mailInfo?.returnPath ?? ''}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>From</Table.Cell>
            <Table.Cell>
              <MailAddressView mailAddress={mailInfo?.from} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>To</Table.Cell>
            <Table.Cell>
              {mailInfo?.to?.map((to, index) => (
                <MailAddressView key={`to-${index}`} mailAddress={to} />
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cc</Table.Cell>
            <Table.Cell>
              {mailInfo?.cc?.map((cc, index) => (
                <MailAddressView key={`cc-${index}`} mailAddress={cc} />
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bcc</Table.Cell>
            <Table.Cell>
              {mailInfo?.bcc?.map((bcc, index) => (
                <MailAddressView key={`bcc-${index}`} mailAddress={bcc} />
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>replyTo</Table.Cell>
            <Table.Cell>
              <MailAddressView mailAddress={mailInfo?.replyTo} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>件名</Text>
            </Table.Cell>
            <Table.Cell>
              {mailInfo?.subject ?? ''}
              <CopyText hasCopied={hasCopiedSubject} onCopy={onCopySubject} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <AccordionRoot multiple>
        <AccordionItem value="attachments">
          <AccordionItemTrigger>
            <Box flex="1" textAlign="left">
              添付ファイル
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent pb={2}>
            <Table.Root>
              <Table.Body>
                {mailInfo?.attachments.map((attachment, index) => (
                  <Table.Row key={`header-${index}-${attachment.contentId}`}>
                    <Table.Cell>{attachment.filename}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>

      <BodyTextPlain mailRaw={mailRaw} mailInfo={mailInfo} />

      <BodyTextHtml mailRaw={mailRaw} mailInfo={mailInfo} />
    </Box>
  )
}
