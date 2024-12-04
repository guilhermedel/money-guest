<template>
  <div class="page-category">
    <div class="category-header">
      <TheTitlePage title-message="Categoria" />
    </div>
    <TheListMoneyCard class="category-money-cards" :cards="moneyCards" />
    <main class="category-main">
      <TheBigCard
        class="card-main"
        :title-card="storeCategory.categoryData.categoryName"
        paragraph-card="O limite de gasto nessa categoria é R$ 1.000,00."
      >
        <TheLoading v-if="storeCategory.loadingCategory" />
        <TheListTransaction
          v-else
          is-category
          :is-popover="false"
          :transaction-list="storeCategory.categoryData.categoryTratament"
        />
      </TheBigCard>
    </main>
  </div>
</template>

<script lang="ts">
import type { IMoneyCard } from "~/interface/organisms/TheMoneyCard"
import type { IItemListTransactionProp } from "~/interface/organisms/TheItemListTransaction"
import { addFeedback } from "~/utils/addFeedback"
import { useStoreCategory } from "~/store/useCategory"
import { currencyBRL } from "~/utils/numberTocurrency"

export default {
  name: "PageExpenses",

  data() {
    return {
      itemListTransaction: [
        {
          nameAccount: "Conta Itaú",
          nameCategory: "Carteira",
          colorCategory: "red",
          dateTime: "10/06/2024 - 19:23",
          recipeName: "Cinema",
          revenueValue: "R$ 89,90"
        },
        {
          nameAccount: "Conta Itaú",
          nameCategory: "Carteira",
          colorCategory: "red",
          dateTime: "10/06/2024 - 19:23",
          recipeName: "Estacinamento",
          revenueValue: "R$ 30,00"
        },
        {
          nameAccount: "Conta Itaú",
          nameCategory: "Carteira",
          colorCategory: "red",
          dateTime: "10/06/2024 - 19:23",
          recipeName: "Madero",
          revenueValue: "R$ 230,52"
        },
        {
          nameAccount: "Conta Itaú",
          nameCategory: "Carteira",
          colorCategory: "red",
          dateTime: "10/06/2024 - 19:23",
          recipeName: "Açaí",
          revenueValue: "R$ 19,00"
        },
        {
          nameAccount: "Conta Itaú",
          nameCategory: "Carteira",
          colorCategory: "red",
          dateTime: "10/06/20 - 19:23",
          recipeName: "Gasoli24",
          revenueValue: "R$ 200,00"
        }
      ] as IItemListTransactionProp[],
    }
  },

  setup() {
    const storeCategory = useStoreCategory()

    return {
      storeCategory
    }
  },

  computed: {
    moneyCards(): IMoneyCard[] {
      return [
        {
          title: "Limite de Gasto",
          moneyValue: this.storeCategory.categoryData.spendingLimit,
          moneyColor: "blue",
          icon: "IconArrowUp"
        },
        {
          title: "Total Gasto",
          moneyValue: this.storeCategory.categoryData.revenueValue,
          moneyColor: "green",
          icon: "IconAlert"
        },
        {
          title: "Saldo",
          moneyValue: this.storeCategory.categoryData.categoryBalance,
          moneyColor: "yellow",
          icon: "IconBarChart"
        }
      ]
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
      const categoryId: string = Array.isArray(this.$route.params.id) ? '' : this.$route.params.id
      const error = await this.storeCategory.getCategory(categoryId)

      if(error) this.$router.go(-1)
    })
  }
}
</script>

<style lang="scss" scoped>
.page-category {
  .category-header {
    @include useDatePicker;
  }

  .category-money-cards {
    margin-top: rem(16);
  }

  .card-main {
    margin-top: rem(16);
  }

  .card-info {
    margin-top: rem(16);

    .info-list {
      width: 100%;

      .info-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;

        + .info-item {
          margin-top: rem(16);
        }
      }
    }
  }
}
</style>
