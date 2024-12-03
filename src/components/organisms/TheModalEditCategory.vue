<template>
  <TheModal
    :is-opened="isOpened"
    :is-disabled="loadingRequest"
    title="Edite a categoria"
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
        :value="modalValue.categoryName"
        :is-input-disabled="loadingRequest"
        v-model="dataEditCategory.categoryName"
      />
      <TheSelect
        ref="selectColor"
        select-name="Selecione a cor da categoria"
        select-id="category"
        is-label
        is-validate
        :value="modalValue.categoryColor"
        :is-select-disabled="loadingRequest"
        :select-options="selectOptions"
        v-model="dataEditCategory.categoryColor"
      />
    </form>
  </TheModal>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IModalCreateOrEditCategoryData } from "~/interface/organisms/TheModalCreateOrEditCategory"
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"
import { useFormValidation } from '~/composables/useFormValidation'


export default {
  name: "TheModalEditCategory",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    categoryData: {
      type: Object as () => IModalCreateOrEditCategoryData,
      default: () => ({} as IModalCreateOrEditCategoryData)
    },
    loadingRequest: {
      type: Boolean,
      default: false
    },
    categoryId: {
      type: String,
      required: true
    },
    modalValue: {
      type: Object as () => IItemListCategoryProp,
      default: () => ({} as IItemListCategoryProp)
    }
  },

  data() {
    return {
      dataEditCategory: {
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
        this.$emit("modal-category:submit", {
          id: this.categoryId,
          ...this.dataEditCategory
        })
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
