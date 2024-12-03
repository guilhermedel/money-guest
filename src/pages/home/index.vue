<template>
  <section class="home">
    <div class="home-header">
      <TheTitlePage title-message="Informações inicias" />
    </div>
    <main class="main">
      <TheListMoneyCard :cards="moneyCards" />
      <div class="big-cards">
        <TheBigCard
          class="card"
          title-card="Cartões de Crédito"
          paragraph-card="Veja seus cartões utilizados recentemente."
          button-link-message="Ver todos os cartões"
          is-button-link-card
          @big-card:click="handleBigCardClick('card')"
        >
          <TheListCard :card-list="storeCard.cards" />
        </TheBigCard>
        <TheBigCard
          class="card"
          title-card="Contas Bancárias"
          paragraph-card="Veja o saldo de suas contas bancárias."
          button-link-message="Ver todas as contas"
          is-button-link-card
          @big-card:click="handleBigCardClick('account')"
        >
          <TheListAccount :account-list="storeAccount.allAccount" />
        </TheBigCard>
        <TheBigCard
          class="card"
          title-card="Gastos por Categoria"
          paragraph-card="Veja suas categorias de despesas."
          button-link-message="Ver todas as categorias"
          is-button-link-card
          @big-card:click="handleBigCardClick('category')"
        >
          <TheListCategory :category-list="storeCategory.categoryAll" />
        </TheBigCard>
        <TheBigCard
          class="card"
          title-card="Gráfico de Gasto por Categoria"
          paragraph-card="Veja a comparação de gasto por categorias."
        />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import type { IMoneyCard } from "~/interface/organisms/TheMoneyCard"
import type { IItemListCardProp } from "~/interface/organisms/TheItemListCard"
import type { IItemListAccountProp } from "~/interface/organisms/TheItemListAccount"
import type { IItemListCategoryProp } from "~/interface/organisms/TheItemListCategory"
import { auth } from '~/utils/authToken'
import { addFeedback } from "~/utils/addFeedback"
import { currencyBRL } from "~/utils/numberTocurrency"
import { useStoreCard } from "~/store/useCard"
import { useStoreAccount } from "~/store/useAccount"
import { useStoreCategory } from "~/store/useCategory"
import { useStoreRevenue } from "~/store/useTransactionRevenue"
import { useStoreExpense } from "~/store/useTransactionExpense"

export default {
  name: "AppIndex",

  setup() {
    const storeCard = useStoreCard()
    const storeAccount = useStoreAccount()
    const storeCategory = useStoreCategory()
    const storeRevenue = useStoreRevenue()
    const storeExpense = useStoreExpense()

    return {
      storeCard,
      storeAccount,
      storeCategory,
      storeRevenue,
      storeExpense
    }
  },

  computed: {
    moneyCards(): IMoneyCard[] {
      return [
        {
          title: "Entrada",
          moneyValue: currencyBRL(this.storeRevenue.totalRevenue),
          moneyColor: "green",
          icon: "IconArrowUp"
        },
        {
          title: "Limite",
          moneyValue: "R$ 2000",
          moneyColor: "blue",
          icon: "IconAlert"
        },
        {
          title: "Saída",
          moneyValue: currencyBRL(this.storeExpense.totalExpense),
          moneyColor: "red",
          icon: "IconArrowDown"
        },
        {
          title: "Balanço",
          moneyValue: this.totalBalance,
          moneyColor: "yellow",
          icon: "IconBarChart"
        }
      ]
    },

    totalBalance(): string {
      return currencyBRL(this.storeRevenue.totalRevenue - this.storeExpense.totalExpense)
    }
  },

  methods: {
    handleBigCardClick(route: string) {
      this.$router.push(`/${route}`)
    }
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
      Promise.all([
        this.storeCard.getAllCard(),
        this.storeAccount.getAllAccount(),
        this.storeCategory.getAllCategory(),
        this.storeExpense.getTransactionExpense(),
        this.storeRevenue.getTransactionRevenue()
      ])
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  .home-header {
    @include useDatePicker;
  }

  .main {
    margin: rem(20) 0;
    display: flex;
    flex-direction: column;
    gap: rem(8);

    .big-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: rem(8);

      .card {
        flex-grow: 1;
        flex-basis: 0;
      }
    }
  }
}
</style>
