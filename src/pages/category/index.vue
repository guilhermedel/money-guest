<template>
  <div class="page-category">
    <TheTitlePage title-message="Categorias" />
    <TheButtonLink
      class="button-link"
      button-message="Adicionar categoria"
      button-action="add-category"
      @button:add-category="handleOpenModalCreateCategory"
    >
      <IconAdd />
    </TheButtonLink>
    <main class="category-main">
      <TheBigCard
        class="card-main"
        title-card="Gastos por Categoria"
        paragraph-card="Veja suas categorias de despesas."
      >
        <TheLoading v-if="storeCategory.loadingCategory" />
        <TheListCategory
          v-else
          is-popover
          is-click
          :category-list="storeCategory.categoryAll"
          @category:view="handleOpenCategory"
          @category:edit="handleOpenModalEditCategory"
          @category:delete="handleOpenModalDeleteCategory"
        />
      </TheBigCard>
    </main>
    <TheModalCreateCategory
      :is-opened="createCategoryModalOpened"
      :loading-request="loadingRequest"
      @modal-category:close="handleCloseModalCreateCategory"
      @modal-category:submit="handleCreateCategory"
    />
    <TheModalEditCategory
      :is-opened="editCategoryModalOpened"
      :loading-request="loadingRequest"
      :category-id="categoryId"
      :modal-value="categorySelect"
      @modal-category:close="handleCloseModalEditCategory"
      @modal-category:submit="handleEditCategory"
    />
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja excluir?"
      :paragraph-confirmation="$options.paragraphDeleteCategory"
      :is-opened="deleteCategoryModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalDeleteCategory"
      @modal-confirmation:submit="handleDeleteCategory"
    />
  </div>
</template>

<script lang="ts">
import type { IModalCreateOrEditCategoryData } from "~/interface/organisms/TheModalCreateOrEditCategory"
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"
import { useStoreCategory } from "~/store/useCategory"
import { addFeedback } from "~/utils/addFeedback"

export default {
  name: "PageCategories",

  data() {
    return {
      categoryId: '' as string,
      loadingRequest: false as boolean,
      createCategoryModalOpened: false as boolean,
      editCategoryModalOpened: false as boolean,
      deleteCategoryModalOpened: false as boolean
    }
  },

  setup() {
    const storeCategory = useStoreCategory()

    return {
      storeCategory
    }
  },

  computed: {
    categorySelect(): IItemListCategoryProp {
      return this.storeCategory.categoryAll
      ?.find((category: IItemListCategoryProp) => category._id === this.categoryId)
      ?? {} as IItemListCategoryProp
    }
  },

  methods: {
    handleOpenCategory(categoryId: number): void {
      this.$router.push(`/category/${categoryId}`)
    },
    handleOpenModalCreateCategory(): void {
      this.createCategoryModalOpened = true
    },
    handleCloseModalCreateCategory(): void {
      this.createCategoryModalOpened = false
    },
    handleOpenModalEditCategory(categoryId: string): void {
      this.categoryId = categoryId
      this.editCategoryModalOpened = true
    },
    handleCloseModalEditCategory(): void {
      this.editCategoryModalOpened = false
    },
    handleOpenModalDeleteCategory( categoryId: string): void {
      this.categoryId = categoryId
      this.deleteCategoryModalOpened = true
    },
    handleCloseModalDeleteCategory(): void{
      this.deleteCategoryModalOpened = false
    },
    async handleGetAllCategory(): Promise<void> {
      this.loadingRequest = true
      await this.storeCategory?.getAllCategory()

      this.loadingRequest = false
      this.handleCloseModalCreateCategory()
    },
    async handleCreateCategory(categoryPayload: IModalCreateOrEditCategoryData): Promise<void> {
      this.loadingRequest = true
      await this.storeCategory.postCategory(categoryPayload)

      this.loadingRequest = false
      this.handleCloseModalCreateCategory()
    },
    async handleEditCategory(categoryPayload: IModalCreateOrEditCategoryData): Promise<void> {
      this.loadingRequest = true
      await this.storeCategory.putCategory(categoryPayload, this.categoryId)

      this.loadingRequest = false
      this.handleCloseModalEditCategory()
    },
    async handleDeleteCategory(): Promise<void> {
      this.loadingRequest = true
      await this.storeCategory.deleteCategory(this.categoryId)

      this.loadingRequest = false
      this.handleCloseModalDeleteCategory()
    },
  },

  beforeMount() {
    const isAuthorization = auth()

    if(!isAuthorization) {
      addFeedback({
        isFeedbackActive: true,
        isError: true,
        feedbackMessage: "Usuário não tem permissão."
      })

      this.$router.push('/login') 
    }
  },

  mounted() {
    this.$nextTick(async () => {
      await this.handleGetAllCategory()
    })
  },

  paragraphDeleteCategory:
    "Se você optar por excluir, será necessário adicionar novamente caso queira restaurar essa informação no futuro."
}
</script>

<style lang="scss" scoped>
.page-category {
  .button-link {
    margin-top: rem(20);
  }

  .card-main {
    margin-top: rem(16);
  }
}
</style>
