export const StringNewlineCharacter = (value: string) => {
  const regex = /(\r\n|\r|\n)/g
  const matches = value.match(regex)

  if (!matches) {
    return '不明'
  }

  if (matches.every((match) => match === '\n')) {
    return 'LF'
  }

  if (matches.every((match) => match === '\r\n')) {
    return 'CRLF'
  }

  return '改行コード混在'
}
