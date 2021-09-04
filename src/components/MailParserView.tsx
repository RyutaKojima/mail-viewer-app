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
  Textarea,
  Tr,
} from '@chakra-ui/react'
import MailAddressView from './MailAddressView'

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
  if (!mail) {
    return <Box>左ペインにメールデータを貼り付けてください</Box>
  }

  const [errors, setErrors] = useState([])

  const [headers, setHeaders] = useState<MailHeaderRecord[]>([])
  const [mailDate, setMailDate] = useState('')
  const [mailMessageId, setMailMessageId] = useState('')
  const [subject, setSubject] = useState('')
  const [mailText, setMailText] = useState('')
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

  useEffect(() => {
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
        setReturnPath(email.returnPath)
        setHeaders(email.headers ?? [])
        setAttachments(email.attachments ?? [])
        setMailTo(email.to ?? [])
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
              {headers.map((header, index) => (
                <Tr key={`header-${index}-${header.key}`}>
                  <Td>{header.key}</Td>
                  <Td>{header.value}</Td>
                </Tr>
              ))}
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
            <Td>replyTo</Td>
            <Td>
              <MailAddressView mailAddress={replyTo} />
            </Td>
          </Tr>
          <Tr>
            <Td>添付ファイル</Td>
            <Td>not supported</Td>
          </Tr>
          <Tr>
            <Td>件名</Td>
            <Td>{subject}</Td>
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
        <Textarea
          value={mailText}
          minH="400px"
          isFullWidth={true}
          isReadOnly={true}
        />
      </Box>
    </Box>
  )
}

export default MailParserView
