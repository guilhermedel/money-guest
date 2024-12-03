export function userId(): string {
  if(import.meta.client) {
    const userId: string = window.localStorage.getItem('userId') || ''
    return userId
  }
  return ''
}