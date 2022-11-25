import React, { useEffect, useState } from 'react'
import PostalMime from 'postal-mime'
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

type Props = {
  mail: string
}

type MailHeaderRecord = {
  key: string
  value: string
}
type MailAttachmentRecord = {
  filename: string
  mimeType: string
  disposition: string
  related: boolean
  contentId: string
  content: any
}
type MailAddressRecord = {
  name: string
  address: string
}

export const MailParserView: React.FC<Props> = ({ mail }): JSX.Element => {
  const [errors, setErrors] = useState([])

  const [headers, setHeaders] = useState<MailHeaderRecord[]>([])
  const [mailDate, setMailDate] = useState('')
  const [mailMessageId, setMailMessageId] = useState('')
  const [subject, setSubject] = useState('')
  const [mailText, setMailText] = useState('')
  const [mailHtml, setMailHtml] = useState('')
  const [returnPath, setReturnPath] = useState('')
  const [mailFrom, setMailFrom] = useState<MailAddressRecord>({
    name: '',
    address: '',
  })
  const [attachments, setAttachments] = useState<MailAttachmentRecord[]>([])
  const [replyTo, setReplyTo] = useState<MailAddressRecord>({
    name: '',
    address: '',
  })
  const [mailTo, setMailTo] = useState<MailAddressRecord[]>([])
  const [mailCc, setMailCc] = useState<MailAddressRecord[]>([])
  const [mailBcc, setMailBcc] = useState<MailAddressRecord[]>([])

  useEffect(() => {
    if (!mail) return

    new PostalMime()
      .parse(Buffer.from(mail))
      .then((email) => {
        // console.log(email)
        // console.log(email.html)

        if (!email?.messageId || !email?.subject) {
          setErrors(['メールデータの解析に失敗しました'])
          return
        }

        setMailDate(email.date)
        setMailMessageId(email.messageId)
        setSubject(email.subject)
        setMailText(email.text)
        setMailHtml(email.html)
        setReturnPath(email.returnPath)
        setHeaders(email.headers ?? [])
        setAttachments(email.attachments ?? [])
        setMailTo(email.to ?? [])
        setMailCc(email.cc ?? [])
        setMailBcc(email.bcc ?? [])
        setMailFrom({
          name: email?.from?.name ?? '',
          address: email?.from?.address ?? '',
        })
        setReplyTo({
          name: email?.replyTo?.name ?? '',
          address: email?.replyTo?.address ?? '',
        })

        setErrors([])
      })
      .catch((err) => {
        console.error(err)
        setErrors(['error'])
      })
  }, [mail])

  const { hasCopied: hasCopiedSubject, onCopy: onCopySubject } =
    useClipboard(subject)
  const { hasCopied: hasCopiedText, onCopy: onCopyText } =
    useClipboard(mailText)
  const { hasCopied: hasCopiedHtml, onCopy: onCopyHtml } =
    useClipboard(mailHtml)

  if (!mail) {
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
          <AccordionPanel pb={4}>
            <Table>
              <Tbody>
                {headers.map((header, index) => (
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
            <Td>{mailDate}</Td>
          </Tr>
          <Tr>
            <Td>messageId</Td>
            <Td>{mailMessageId}</Td>
          </Tr>
          <Tr>
            <Td>returnPath</Td>
            <Td>{returnPath}</Td>
          </Tr>
          <Tr>
            <Td>From</Td>
            <Td>
              <MailAddressView mailAddress={mailFrom} />
            </Td>
          </Tr>
          <Tr>
            <Td>To</Td>
            <Td>
              {mailTo.map((to, index) => (
                <MailAddressView key={`to-${index}`} mailAddress={to} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Cc</Td>
            <Td>
              {mailCc.map((cc, index) => (
                <MailAddressView key={`cc-${index}`} mailAddress={cc} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>Bcc</Td>
            <Td>
              {mailBcc.map((bcc, index) => (
                <MailAddressView key={`bcc-${index}`} mailAddress={bcc} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td>replyTo</Td>
            <Td>
              <MailAddressView mailAddress={replyTo} />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>件名</Text>
            </Td>
            <Td>
              {subject}
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
              {attachments.map((attachment, index) => (
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
          value={mailText}
          minH="400px"
          width="full"
          isReadOnly={true}
        />
      </Box>
      <Box mx={5} my={2}>
        text/html <CopyText hasCopied={hasCopiedHtml} onCopy={onCopyHtml} />
        <Textarea
          value={mailHtml}
          minH="400px"
          width="full"
          isReadOnly={true}
        />
      </Box>
    </Box>
  )
}

export default MailParserView
