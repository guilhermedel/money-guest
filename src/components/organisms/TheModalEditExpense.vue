<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Edite a saída"
    @modal:close="handleClose"
    @modal:submit="handleSubmit"
  >
    <form class="form">
      <TheInputField
        ref="inputName"
        is-label
        input-type="text"
        input-id="name"
        input-name="Nome"
        input-placeholder="Digite o nome da entrada..."
        input-validate="name"
        :value="modalValue.expenseName"
        v-model="editExpense.expenseName"
      />
      <TheInputField
        ref="inputValue"
        is-label
        is-money
        input-type="text"
        input-id="revenue"
        input-name="Valor"
        input-placeholder="Digite o valor da entrada..."
        input-validate="number"
        :value="modalValue.expenseValue"
        v-model="editExpense.expenseValue"
      />
      <TheInputField
        ref="inputEstablishment"
        is-label
        input-type="text"
        input-id="establishment"
        input-name="Estabelecimento"
        input-placeholder="Digite o nome do estabelecimento..."
        input-validate="name"
        :value="modalValue.expenseEstablishment"
        v-model="editExpense.expenseEstablishment"
      />
      <TheSelect
        ref="selectCategory"
        is-label
        is-validate
        select-name="Categoria"
        select-id="category"
        :select-options="categories"
        :value="modalValue.expenseCategory"
        v-model="editExpense.expenseCategory"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IModalCreateOrEditExpenseData } from "~/interface/organisms/TheModalCreateOrEditExpense"
import type { IEditExpense } from "~/interface/organisms/TheItemListTransaction"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheModalEditExpense",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    expenseData: {
      type: Object,
      default: () => {}
    },
    loadingRequest: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array as () => ISelectOptionsProp[],
      default: () => ([] as ISelectOptionsProp[])
    },
    modalValue: {
      type: Object as () => IEditExpense,
      default: () => ({} as IEditExpense)
    }
  },

  data() {
    return {
      editExpense: {
        expenseName: "",
        expenseValue: "",
        expenseCategory: "",
        expenseEstablishment: ""
      } as IModalCreateOrEditExpenseData
    }
  },

  methods: {
    handleClose(): void {
      this.$emit("modal-expense:close")
    },
    handleSubmit(): void {
      if(this.isValidateFormRequest())
        this.$emit("modal-expense:submit", this.editExpense)
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
