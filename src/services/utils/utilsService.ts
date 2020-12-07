export const isInternetExplorer: boolean =
  window.navigator.userAgent.includes('MSIE ') ||
  window.navigator.userAgent.includes('Trident/')

export const convertToDate = (isoDate: string, locale: string) => {
  const date = new Date(isoDate)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString(locale, options)
}
export const convertToTime = (isoDate: string, locale: string) => {
  const date = new Date(isoDate)

  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}
