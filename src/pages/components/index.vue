<template>
  <TheTitlePage title-message="Ola, mundo!" />
  <TheParagraph paragraph-message="Billy, dog!" />
  <InputField
    input-type="text"
    input-id="test"
    input-name="Nome"
    input-placeholder="Digite seu nome..."
  />
  <TheSelect
    select-name="gender"
    select-id="gender-register"
    :select-options="selectOptions"
  />
  <ButtonForm button-message="Login" />
  <TheButtonLink button-message="Nova Entrada" button-action="add-entry">
    <IconArrowDown />
  </TheButtonLink>
  <TheTitleMoney title-message="R$ 300,00" title-color="green" />
  <TheMoneyCard
    title-card="Entrada"
    money-value="R$ 300"
    money-color="green"
    class="info-money"
  >
    <IconArrowUp icon-color="green" />
  </TheMoneyCard>
  <ThePercentage percentage="78" status="low" />
  <TheItemListCard class="info-card" :itemList="itemListCard" />
  <ThePopover :popover-options="popoverOptions" />
  <TheItemListTransaction class="info-card" :itemList="itemListTransaction" />
  <TheItemListCategory class="list-category" :item-category="itemListCategory" />
  <TheIconMark color="green" />
  <TheItemListAccount class="info-card" :item-account="itemListAccount" />
  <TheTitleSection title-message="Testando mais um!" />
  <TheBigCard
    title-card="Testando big card"
    paragraph-card="Teste do paragrafo do card"
    paragraph-link="Ver todos os cartões"
  >
    <TheItemListCard :itemList="itemListCard" />
    <TheItemListCard :itemList="itemListCard" />
    <TheItemListCard :itemList="itemListCard" />
    <TheItemListCard :itemList="itemListCard" />
  </TheBigCard>
  <TheHeaderNavigation :routes="routes" />
  <TheFirstLetterName user-name="nathan" />
  <TheUserProfile user-name="Nathan" user-email="nathan@gmail.com" />
  <TheNotification />
  <TheHeader />
  <TheFooter />
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "../../interface/atoms/TheSelect"
import type { IPopoverOptionsProp } from "../../interface/atoms/ThePopoverInterface"
import type { IItemListCardProp } from "../../interface/organisms/TheItemListCard"
import type { IItemListTransactionProp } from "../../interface/organisms/TheItemListTransaction"
import type { IItemListCategoryProp } from "../../interface/organisms/TheItemListCategory"
import type { IItemListAccountProp } from "../../interface/organisms/TheItemListAccount"
import type { IHeaderNavigationProp } from "../../interface/molecules/TheHeaderNavigation"

export default {
  name: "App",

  data() {
    return {
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
      ] as ISelectOptionsProp[],
      itemListCard: {
        nameBanking: "Itaú",
        cardFlag: "visa",
        cardLastNumber: "Final 5552",
        cardLimited: "De: R$ 3750,43",
        cardInvoice: "Fatura: R$ 1870,00",
        cardPercentageLimited: "28",
        cardStatus: "moderate"
      } as IItemListCardProp,
      itemListTransaction: {
        nameAccount: "Conta Itaú",
        nameCategory: "Carteira",
        colorCategory: "blue",
        recipeName: "10/06/2024 Salário",
        revenueValue: "R$ 4.322,89"
      } as IItemListTransactionProp,
      itemListCategory: {
        nameCategory: "Transporte",
        colorCategory: "blue",
        revenueValue: "R$ 890,00"
      } as IItemListCategoryProp,
      itemListAccount: {
        nameBanking: "Nubank",
        cardFlag: "mastercard",
        balance: "R$ 890,00"
      } as IItemListAccountProp,
      popoverOptions: [
        {
          id: 1,
          label: "Editar",
          action: "edit"
        },
        {
          id: 2,
          label: "Excluir",
          action: "delete"
        }
      ] as IPopoverOptionsProp[],
      routes: [
        {
          id: 1,
          name: "Entrada",
          path: "/entrada"
        },
        {
          id: 2,
          name: "saída",
          path: "/saida"
        },
        {
          id: 3,
          name: "Categoria",
          path: "/categoria"
        }
      ] as IHeaderNavigationProp[]
    }
  }
}
</script>

<style lang="scss">
.info-money {
  max-width: rem(300);
}

.info-card {
  max-width: rem(540);
  background: $white;
  // min-height: rem(65);
}

.list-category {
  max-width: rem(800);
}
</style>
