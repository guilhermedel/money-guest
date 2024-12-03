<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Edite a entrada"
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
        :value="modalValue.revenueName"
        :is-input-disabled="loadingRequest"
        v-model="editRevenue.expenseName"
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
        :value="modalValue.revenueValue"
        :is-input-disabled="loadingRequest"
        v-model="editRevenue.expenseValue"
      />
      <TheSelect
        ref="selectAccount"
        is-label
        is-validate
        select-name="Conta"
        select-id="account"
        :is-input-disabled="loadingRequest"
        :select-options="accounties"
        v-model="editRevenue.expenseAccount"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IModalCreateOrEditRevenueData } from "~/interface/organisms/TheModalCreateOrEditRevenue"
import type { IEditRevenue } from "~/interface/organisms/TheItemListTransaction"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheModalEditRevenue",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    revenueData: {
      type: Object,
      default: () => {}
    },
    loadingRequest: {
      type: Boolean,
      default: false
    },
    accounties: {
      type: Array as () => ISelectOptionsProp[],
      default: () => ([] as ISelectOptionsProp[])
    },
    modalValue: {
      type: Object as () => IEditRevenue,
      default: () => ({} as IEditRevenue)
    }
  },

  data() {
    return {
      editRevenue: {
        expenseName: "",
        expenseValue: "",
        expenseAccount: ""
      } as IModalCreateOrEditRevenueData
    }
  },

  methods: {
    handleClose(): void {
      this.$emit("modal-revenue:close")
    },
    handleSubmit(): void {
      if(this.isValidateFormRequest())
        this.$emit("modal-revenue:submit", this.editRevenue)
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
