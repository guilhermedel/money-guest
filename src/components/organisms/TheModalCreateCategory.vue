<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Adicione uma nova categoria"
    @modal:close="handleClose"
    @modal:submit="handleSubmit"
  >
    <form class="form">
      <TheInputField
        ref="inputCategory"
        is-label
        input-type="text"
        input-id="name"
        input-name="Nome"
        input-placeholder="Digite o nome da categoria..."
        input-validate="name"
        :is-input-disabled="loadingRequest"
        v-model="dataCreateCategory.categoryName"
      />
      <TheSelect
        ref="selectColor"
        select-name="Selecione a cor da categoria"
        select-id="category"
        is-label
        is-validate
        :is-select-disabled="loadingRequest"
        :select-options="selectOptions"
        v-model="dataCreateCategory.categoryColor"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IModalCreateOrEditCategoryData } from "~/interface/organisms/TheModalCreateOrEditCategory"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheModalCreateCategory",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    loadingRequest: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dataCreateCategory: {
        categoryName: "",
        categoryColor: ""
      } as IModalCreateOrEditCategoryData,
      selectOptions: [
        {
          value: "",
          label: "Selecione uma opção"
        },
        {
          value: "red",
          label: "Vermelho"
        },
        {
          value: "blue",
          label: "Azul"
        },
        {
          value: "yellow",
          label: "Amarelo"
        },
        {
          value: "green",
          label: "Verde"
        },
        {
          value: "gray",
          label: "Cinza"
        },
        {
          value: "purple",
          label: "Roxo"
        },
        {
          value: "black",
          label: "Preto"
        }
      ] as ISelectOptionsProp[]
    }
  },

  methods: {
    handleClose(): void {
      this.$emit("modal-category:close")
    },
    handleSubmit(): void {
      if (this.isValidateFormRequest())
        this.$emit("modal-category:submit", this.dataCreateCategory)
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
