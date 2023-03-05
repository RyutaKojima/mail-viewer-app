import { useEffect, useState } from 'react'
import PostalMime from 'postal-mime'

export type MailHeaderRecord = {
  key: string
  value: string
}

export type MailAttachmentRecord = {
  filename: string
  mimeType: string
  disposition: string
  related: boolean
  contentId: string
  content: any
}

export type MailAddressRecord = {
  name: string
  address: string
}

export type MailInfo = {
  messageId: string
  headers: MailHeaderRecord[]
  attachments: MailAttachmentRecord[]
  sender: MailAddressRecord
  from: MailAddressRecord
  replyTo: MailAddressRecord
  to: MailAddressRecord[]
  cc: MailAddressRecord[]
  bcc: MailAddressRecord[]
  subject: string
  date: string
  text: string
  html: string
  returnPath: string
}

type Return = { errors: string[]; mailInfo: MailInfo | null }

export const useMailParse = (mailRaw: string): Return | null => {
  const [errors, setErrors] = useState([])
  const [mailInfo, setMailInfo] = useState(null)

  useEffect(() => {
    (async () => {
      if (!mailRaw) {
        setMailInfo(null)
        setErrors([])
        return
      }

      try {
        const parser = new PostalMime()
        const email = await parser.parse(Buffer.from(mailRaw))

        // console.log(email)

        if (!email?.messageId || !email?.subject) {
          setMailInfo(null)
          setErrors(['メールデータの解析に失敗しました'])
          return
        }

        setMailInfo(email)
        setErrors([])
      } catch (err) {
        console.error(err)
        setMailInfo(null)
        setErrors(['Unexpected Error'])
      }
    })()
  }, [mailRaw])

  return { mailInfo, errors }
}
