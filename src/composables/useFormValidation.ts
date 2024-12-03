
export function useFormValidation(refs: any[]): boolean {
  const isValid: boolean = !!refs.reduce((acc, ref: any): boolean => {
    if(ref.validate()) return acc = true
    return acc = false
  }, false)

  return isValid
}
