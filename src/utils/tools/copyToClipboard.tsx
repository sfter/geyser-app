export const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(textArea)
  }
}

export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }

  navigator.clipboard.writeText(text)
}
