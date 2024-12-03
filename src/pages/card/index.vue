<template>
  <div class="page-category">
    <TheTitlePage title-message="Cartões" />
    <TheButtonLink
      class="button-link"
      button-message="Adicionar cartão"
      button-action="add-card"
      @button:add-card="handleOpenModalCreateCard"
    >
      <IconAdd />
    </TheButtonLink>
    <main class="category-main">
      <TheBigCard
        class="card-main"
        title-card="Lista de cartões "
        paragraph-card="Veja seu cartões, e monitore com facilidade."
      >
        <TheLoading v-if="storeCard.loadingCards" />
        <TheListCard
          v-else
          is-popover
          :card-list="storeCard.cards"
          @card:edit="handleOpenModalEditCard"
          @card:delete="handleOpenModalDeleteCard"
        />
      </TheBigCard>
    </main>
    <TheModalCreateCard
      :is-opened="createCardModalOpened"
      :loading-request="loadingRequest"
      @modal-card:close="handleCloseModalCreateCard"
      @modal-card:submit="handleCreateCard"
    />
    <TheModalEditCard
      :is-opened="editCardModalOpened"
      :loading-request="loadingRequest"
      :modal-value="cardSelect"
      @modal-card:close="handleCloseModalEditCard"
      @modal-card:submit="handleEditCard"
    />
    <TheModalConfirmation
      title-confirmation="Tem certeza que deseja excluir?"
      :paragraph-confirmation="$options.paragraphDeleteCard"
      :is-opened="deleteCardModalOpened"
      :is-disabled="loadingRequest"
      @modal-confirmation:close="handleCloseModalDeleteCard"
      @modal-confirmation:submit="handleDeleteCard"
    />
  </div>
</template>

<script lang="ts">
import type { IModalCreateOrEditCardData } from '~/interface/organisms/TheModalCreateOrEditCard'
import type { IGetListCard } from '~/interface/organisms/TheItemListCard'
import { useStoreCard } from "~/store/useCard"
import { addFeedback } from "~/utils/addFeedback"

export default {
  name: "PageCard",

  data() {
    return {
      loadingRequest: false as boolean,
      createCardModalOpened: false,
      editCardModalOpened: false,
      deleteCardModalOpened: false,
      cardId: '' as string,
    }
  },

  setup() {
    const storeCard = useStoreCard()

    return {
      storeCard
    }
  },

  computed: {
    cardSelect(): IGetListCard {
      return this.storeCard.allCards?.find((card: IGetListCard) => card._id === this.cardId)
      ?? {} as IGetListCard
    }
  },

  methods: {
    handleOpenModalCreateCard() {
      this.createCardModalOpened = true
    },
    handleCloseModalCreateCard() {
      this.createCardModalOpened = false
    },
    handleOpenModalEditCard(cardId: string) {
      this.editCardModalOpened = true
      this.cardId = cardId
    },
    handleCloseModalEditCard() {
      this.editCardModalOpened = false
    },
    handleOpenModalDeleteCard(cardId: string) {
      this.deleteCardModalOpened = true
      this.cardId = cardId
    },
    handleCloseModalDeleteCard() {
      this.deleteCardModalOpened = false
    },
    async handleGetAllCards() {
      await this.storeCard.getAllCard()
    },
    async handleCreateCard(cardPayload: IModalCreateOrEditCardData) {
      this.loadingRequest = true
      await this.storeCard.postCard(cardPayload)

      this.loadingRequest = false
      this.handleCloseModalCreateCard()
    },
    async handleEditCard(cardPayload: IModalCreateOrEditCardData) {
      this.loadingRequest = true
      await this.storeCard.putCard(cardPayload, this.cardId)

      this.loadingRequest = false
      this.handleCloseModalEditCard()
    },
    async handleDeleteCard() {
      this.loadingRequest = true
      await this.storeCard.deleteCard(this.cardId)

      this.loadingRequest = false
      this.handleCloseModalDeleteCard()
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
      await this.handleGetAllCards()
    })
  },

  paragraphDeleteCard:
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
