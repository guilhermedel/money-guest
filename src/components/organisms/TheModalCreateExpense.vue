<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Adicione uma nova saída"
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
        input-placeholder="Digite o nome da saída..."
        input-validate="name"
        v-model="createExpense.expenseName"
      />
      <TheInputField
        ref="inputValue"
        is-label
        is-money
        input-type="text"
        input-id="expense"
        input-name="Valor"
        input-placeholder="Digite o valor da saída..."
        input-validate="number"
        v-model="createExpense.expenseValue"
      />
      <TheInputField
        ref="inputEstablishment"
        is-label
        input-type="text"
        input-id="establishment"
        input-name="Estabelecimento"
        input-placeholder="Digite o nome do estabelecimento..."
        input-validate="name"
        v-model="createExpense.expenseEstablishment"
      />
      <TheSelect
        ref="selectCategory"
        is-label
        is-validate
        select-name="Categoria"
        select-id="category"
        :select-options="categories"
        v-model="createExpense.expenseCategory"
      />
      <TheSelect
        ref="selectAccount"
        is-label
        is-validate
        select-name="Conta"
        select-id="account"
        :is-input-disabled="loadingRequest"
        :select-options="accounties"
        v-model="createExpense.expenseAccount"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IModalCreateOrEditExpenseData } from "~/interface/organisms/TheModalCreateOrEditExpense"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheModalCreateExpense",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    loadingRequest: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array as () => ISelectOptionsProp[],
      default: () => ([] as ISelectOptionsProp[])
    },
    accounties: {
      type: Array as () => ISelectOptionsProp[],
      default: () => ([] as ISelectOptionsProp[])
    }
  },

  data() {
    return {
      createExpense: {
        expenseName: "",
        expenseValue: "",
        expenseCategory: "",
        expenseEstablishment: "",
        expenseAccount: ""
      } as IModalCreateOrEditExpenseData,
      selectOptions: [
        {
          value: "",
          label: "Selecione uma opção"
        },
        {
          value: "M",
          label: "Masculino"
        },
        {
          value: "F",
          label: "Feminino"
        }
      ] as ISelectOptionsProp[]
    }
  },

  methods: {
    handleClose(): void {
      this.$emit("modal-expense:close")
    },
    handleSubmit(): void {
      if(this.isValidateFormRequest())
        this.$emit("modal-expense:submit", this.createExpense)
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
