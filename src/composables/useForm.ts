import { ref, watch } from "vue"
interface TypeConfig {
  initialVariable?: string
  regex: RegExp
  message: string
}

const types: Record<string, TypeConfig> = {
  name: {
    initialVariable: "",
    regex: /^[a-zA-Záàãâéèêíïóõôöúüç\s]*$/,
    message: 'Utilize apenas letras.'
  },
  age: {
    initialVariable: "",
    regex: /\d+(\.\d*)?$/,
    message: 'Utilize apenas números.'
  },
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: "Preencha um e-mail válido."
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: "A senha precisa ter um caracter maísculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres."
  },
  ['date-birthday']: {
    initialVariable: "",
    regex: /\d+(\.\d*)?$/,
    message: 'Preencha uma data válida.'
  },
  ['card-validity']: {
    initialVariable: "",
    regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
    message: 'Preencha a validade correta.'
  }
}

function useForm(type: keyof typeof types | false) {
  const inputValue = ref<string | number>(type !== false && types[type]?.initialVariable ? types[type].initialVariable : '')
  const error = ref<string | null>(null)

  watch(inputValue, () => {
    if(error.value !== null && error.value.length) {
      error.value = ''
    } 
  })

  function validate(data: string | number): boolean {
    if (type === false) return true

    if (typeof data === 'string' && data.length === 0) {
      error.value = "O campo é obrigatório."
      return false
    }

    if(typeof data === 'string' && type === 'date-birthday') {
      const formatDate = data.split('/').reverse().join('-')
      const parsedDate = new Date(formatDate)
      const isDateValid = parsedDate instanceof Date && !isNaN(parsedDate.getTime())

      if(!isDateValid) {
        error.value = types[type].message
        return false
      }

      error.value = ''
      return true
    }

    if (typeof data === 'string' && types[type] && !types[type].regex.test(data)) {
      error.value = types[type].message
      return false
    }

    error.value = null
    return true
  }

  return {
    inputValue,
    error,
    validate: () => validate(inputValue.value),
    onBlur: () => validate(inputValue.value)
  }
}

export default useForm
