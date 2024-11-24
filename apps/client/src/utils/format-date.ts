export function formatDate(date: string | Date): string {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat(navigator.language).format(dateObj)
}
