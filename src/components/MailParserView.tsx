import React, { useEffect, useState } from 'react'
import PostalMime from 'postal-mime'
import {
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

type MailAddress = {
  name: string
  address: string
}

export const MailParserView: React.FC<Props> = ({ mail }): JSX.Element => {
  if (!mail) {
    return <Box>左ペインにメールデータを貼り付けてください</Box>
  }

  const [errors, setErrors] = useState([])

  const [mailDate, setMailDate] = useState('')
  const [mailMessageId, setMailMessageId] = useState('')
  const [subject, setSubject] = useState('')
  const [mailText, setMailText] = useState('')
  const [returnPath, setReturnPath] = useState('')
  const [mailFrom, setMailFrom] = useState<MailAddress>({
    name: '',
    address: '',
  })
  const [replyTo, setReplyTo] = useState<MailAddress>({ name: '', address: '' })
  const [mailTo, setMailTo] = useState<MailAddress[]>([])

  useEffect(() => {
    new PostalMime()
      .parse(Buffer.from(mail))
      .then((email) => {
        // console.log(email)
        // console.table(email.headers)
        // console.log(email.attachments)
        // console.log(email.html)
        setErrors([])

        setMailDate(email.date)
        setMailMessageId(email.messageId)
        setSubject(email.subject)
        setMailText(email.text)
        setReturnPath(email.returnPath)

        setMailTo(email.to)
        setMailFrom({
          name: email?.from?.name ?? '',
          address: email?.from?.address ?? '',
        })
        setReplyTo({
          name: email?.replyTo?.name ?? '',
          address: email?.replyTo?.address ?? '',
        })
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
            <Td>Heders</Td>
            <Td>not supported</Td>
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
