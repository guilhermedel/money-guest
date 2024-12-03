import { ref } from 'vue'

export const useCurrencyFormat = () => {
  const inputMoney = ref("R$ 0,00")

  const formatCurrency = (inputValue: string) => {
    let value = inputValue.replace(/\D/g, "")

    if (value === "") {
      inputMoney.value = "R$ 0,00"
      inputValue = inputMoney.value
      return
    }

    const numberValue = Number(value) / 100
    inputMoney.value = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

    inputValue = inputMoney.value
  }

  return {
    inputMoney,
    formatCurrency
  }
}
