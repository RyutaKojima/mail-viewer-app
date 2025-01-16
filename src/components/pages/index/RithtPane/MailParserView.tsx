import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tr,
  useClipboard,
} from '@chakra-ui/react'

import CopyText from 'src/components/CopyText'
import { MailInfo } from 'src/hooks/useMailParse'
import MailAddressView from 'src/components/MailAddressView'
import { BodyTextPlain } from './BodyTextPlain'
import { BodyTextHtml } from './BodyTextHtml'
import { JSX } from 'react'

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
      <Table>
        <TableCaption>エラーが発生しました</TableCaption>
        <Tbody>
          {errors.map((error, index) => (
            <Tr key={`errors-${index}`}>
              <Td>{error}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <Box>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Headers
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} overflow="auto">
            <Table>
              <Tbody>
                {mailInfo?.headers.map((header, index) => (
                  <Tr key={`header-${index}-${header.key}`}>
                    <Td>{header.key}</Td>
                    <Td>{header.value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>date</Td>
            <Td>{mailInfo?.date ?? ''}</Td>
          </Tr>
          <Tr>
            <Td>messageId</Td>
            <Td>{mailInfo?.messageId ?? ''}</Td>
          </Tr>
          <Tr>
            <Td>returnPath</Td>
            <Td>{mailInfo?.returnPath ?? ''}</Td>
          </Tr>
          <Tr>
            <Td>From</Td>
            <Td>
              <MailAddressView mailAddress={mailInfo?.from} />
            </Td>
          </Tr>
          <Tr>
            <Td>To</Td>
            <Td>
              {mailInfo?.to?.map((to, index) => (
                <MailAddressView key={`to-${index}`} mailAddress={to} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Cc</Td>
            <Td>
              {mailInfo?.cc?.map((cc, index) => (
                <MailAddressView key={`cc-${index}`} mailAddress={cc} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Bcc</Td>
            <Td>
              {mailInfo?.bcc?.map((bcc, index) => (
                <MailAddressView key={`bcc-${index}`} mailAddress={bcc} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>replyTo</Td>
            <Td>
              <MailAddressView mailAddress={mailInfo?.replyTo} />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>件名</Text>
            </Td>
            <Td>
              {mailInfo?.subject ?? ''}
              <CopyText hasCopied={hasCopiedSubject} onCopy={onCopySubject} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                添付ファイル
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={2}>
            <Table>
              {mailInfo?.attachments.map((attachment, index) => (
                <Tr key={`header-${index}-${attachment.contentId}`}>
                  <Td>{attachment.filename}</Td>
                </Tr>
              ))}
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <BodyTextPlain mailRaw={mailRaw} mailInfo={mailInfo} />

      <BodyTextHtml mailRaw={mailRaw} mailInfo={mailInfo} />
    </Box>
  )
}
