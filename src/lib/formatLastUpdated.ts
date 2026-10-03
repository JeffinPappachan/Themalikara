const lastUpdatedOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kolkata',
}

export function formatLastUpdated(isoDateTime: string) {
  return new Date(isoDateTime).toLocaleString('en-IN', lastUpdatedOptions)
}
