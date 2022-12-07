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
  Textarea,
  Tr,
  useClipboard,
} from '@chakra-ui/react'

import MailAddressView from '../../MailAddressView'
import CopyText from '../../CopyText'
import { MailInfo } from '../../../hooks/useMailParse'

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
    mailInfo?.subject ?? ''
  )
  const { hasCopied: hasCopiedText, onCopy: onCopyText } = useClipboard(
    mailInfo?.text ?? ''
  )
  const { hasCopied: hasCopiedHtml, onCopy: onCopyHtml } = useClipboard(
    mailInfo?.html ?? ''
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
      <Box mx={5} my={2}>
        text/plain <CopyText hasCopied={hasCopiedText} onCopy={onCopyText} />
        <Textarea
          value={mailInfo?.text ?? ''}
          minH="400px"
          width="full"
          isReadOnly={true}
        />
      </Box>
      <Box mx={5} my={2}>
        text/html <CopyText hasCopied={hasCopiedHtml} onCopy={onCopyHtml} />
        <Textarea
          value={mailInfo?.html ?? ''}
          minH="400px"
          width="full"
          isReadOnly={true}
        />
      </Box>
    </Box>
  )
}
