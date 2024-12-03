<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Edite o cartão"
    @modal:close="handleClose"
    @modal:submit="handleSubmit"
  >
  <form class="form">
      <TheInputField
        ref="inputBankingCardName"
        is-label
        input-type="text"
        input-id="name"
        input-name="Nome do cartão"
        input-placeholder="Digite o nome do cartão..."
        input-validate="name"
        :value="modalValue.cardName"
        :is-input-disabled="loadingRequest"
        v-model="editCard.cardName"
      />
      <TheInputField
        ref="inputBankingCardNumber"
        is-label
        is-mask
        input-type="text"
        input-id="name"
        input-name="Números do Cartão"
        input-placeholder="Digite os números do cartão..."
        input-validate="number"
        input-mask="#### #### #### ####"
        :value="modalValue.cardNumber"
        :is-input-disabled="loadingRequest"
        v-model="editCard.cardNumber"
      />
      <TheInputField
        ref="inputBankingCardDateValidity"
        is-label
        is-mask
        input-type="text"
        input-id="name"
        input-name="Validade do Cartão"
        input-placeholder="Digite a validade do cartão..."
        input-validate="card-validity"
        input-mask="##/##"
        :value="modalValue.cardDateValidity"
        :is-input-disabled="loadingRequest"
        v-model="editCard.cardDateValidity"
      />
      <TheInputField
        ref="inputBankingCardLimit"
        is-money
        is-label
        input-type="text"
        input-id="name"
        input-name="Limite do cartão"
        input-placeholder="Digite o limite do cartão..."
        input-validate="number"
        :value="modalValue.cardLimited"
        :is-input-disabled="loadingRequest"
        v-model="editCard.cardLimited"
      />
      <TheInputField
        ref="inputBankingCardInvoice"
        is-money
        is-label
        input-type="text"
        input-id="name"
        input-name="Fatura do cartão"
        input-placeholder="Digite a fatura do cartão..."
        input-validate="number"
        :value="modalValue.cardInvoice"
        :is-input-disabled="loadingRequest"
        v-model="editCard.cardInvoice"
      />
      <TheSelect
        ref="selectCardFlag"
        select-name="Selecione a bandeira do cartão"
        select-id="cardFlag"
        is-label
        is-validate
        :value="modalValue.cardFlag"
        :is-select-disabled="loadingRequest"
        :select-options="selectOptinonsCardFlag"
        v-model="editCard.cardFlag"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { IModalCreateOrEditCardData } from '~/interface/organisms/TheModalCreateOrEditCard'
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IGetListCard } from "~/interface/organisms/TheItemListCard"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheModalEditCard",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    modalValue: {
      type: Object as () => IGetListCard,
      default: () => ({} as IGetListCard)
    },
    loadingRequest: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      editCard: {
        cardName: "",
        cardLimited: "",
        cardInvoice: "",
        cardNumber: "",
        cardDateValidity: "",
        cardFlag: "",
      } as IModalCreateOrEditCardData,
      selectOptinonsCardFlag: [
        {value: "", label: "Selecione uma opção"},
        {value: "visa", label: "Visa"},
        {value: "mastercard", label: "Mastercard"},
      ] as ISelectOptionsProp[],
      selectOptionsDateClose: [
          {value: "", label: "Selecione uma opção"},
          { value: "01", label: "Todo dia - 1" },
          { value: "02", label: "Todo dia - 2" },
          { value: "03", label: "Todo dia - 3" },
          { value: "04", label: "Todo dia - 4" },
          { value: "05", label: "Todo dia - 5" },
          { value: "06", label: "Todo dia - 6" },
          { value: "07", label: "Todo dia - 7" },
          { value: "08", label: "Todo dia - 8" },
          { value: "09", label: "Todo dia - 9" },
          { value: "10", label: "Todo dia - 10" },
          { value: "11", label: "Todo dia - 11" },
          { value: "12", label: "Todo dia - 12" },
          { value: "13", label: "Todo dia - 13" },
          { value: "14", label: "Todo dia - 14" },
          { value: "15", label: "Todo dia - 15" },
          { value: "16", label: "Todo dia - 16" },
          { value: "17", label: "Todo dia - 17" },
          { value: "18", label: "Todo dia - 18" },
          { value: "19", label: "Todo dia - 19" },
          { value: "20", label: "Todo dia - 20" },
          { value: "21", label: "Todo dia - 21" },
          { value: "22", label: "Todo dia - 22" },
          { value: "23", label: "Todo dia - 23" },
          { value: "24", label: "Todo dia - 24" },
          { value: "25", label: "Todo dia - 25" },
          { value: "26", label: "Todo dia - 26" },
          { value: "27", label: "Todo dia - 27" },
          { value: "28", label: "Todo dia - 28" },
          { value: "29", label: "Todo dia - 29" },
          { value: "30", label: "Todo dia - 30" },
          { value: "31", label: "Todo dia - 31" }
        ] as ISelectOptionsProp[],
      selectOptionsDateMaturity: [
          {value: "", label: "Selecione uma opção"},
          { value: "01", label: "Todo dia - 1" },
          { value: "02", label: "Todo dia - 2" },
          { value: "03", label: "Todo dia - 3" },
          { value: "04", label: "Todo dia - 4" },
          { value: "05", label: "Todo dia - 5" },
          { value: "06", label: "Todo dia - 6" },
          { value: "07", label: "Todo dia - 7" },
          { value: "08", label: "Todo dia - 8" },
          { value: "09", label: "Todo dia - 9" },
          { value: "10", label: "Todo dia - 10" },
          { value: "11", label: "Todo dia - 11" },
          { value: "12", label: "Todo dia - 12" },
          { value: "13", label: "Todo dia - 13" },
          { value: "14", label: "Todo dia - 14" },
          { value: "15", label: "Todo dia - 15" },
          { value: "16", label: "Todo dia - 16" },
          { value: "17", label: "Todo dia - 17" },
          { value: "18", label: "Todo dia - 18" },
          { value: "19", label: "Todo dia - 19" },
          { value: "20", label: "Todo dia - 20" },
          { value: "21", label: "Todo dia - 21" },
          { value: "22", label: "Todo dia - 22" },
          { value: "23", label: "Todo dia - 23" },
          { value: "24", label: "Todo dia - 24" },
          { value: "25", label: "Todo dia - 25" },
          { value: "26", label: "Todo dia - 26" },
          { value: "27", label: "Todo dia - 27" },
          { value: "28", label: "Todo dia - 28" },
          { value: "29", label: "Todo dia - 29" },
          { value: "30", label: "Todo dia - 30" },
          { value: "31", label: "Todo dia - 31" }
        ] as ISelectOptionsProp[]
    }
  },

  methods: {
    handleClose(): void {
      this.$emit("modal-card:close")
    },
    handleSubmit(): void {
      if(this.isValidateFormRequest())
        this.$emit("modal-card:submit", this.editCard)
    },
    isValidateFormRequest(): boolean {
      const refArray = Object.values(this.$refs)
      const isValid = useFormValidation(refArray)

      return isValid
    }
  }
 }
</script>

<style lang="scss" scoped>
.form {
  @include useAlignStartCenter;
  flex-direction: column;
  gap: rem(16);
}
</style>
