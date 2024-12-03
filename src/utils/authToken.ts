export const auth = (): boolean => {
  const token: string = window.localStorage.getItem('token') || ''
  return token?.length > 0
}