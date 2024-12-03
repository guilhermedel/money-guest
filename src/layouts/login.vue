<template>
  <div class="login">
    <div class="info-system">
      <IconLogo logo-color="#fff"/>
      <TheParagraph paragraph-message="Tenha total controle sobre o seu dinheiro."/>
    </div>
    <div class="info-user">
      <TheFeedback
        v-if="feedbackData.isFeedbackActive"
        :error-request="feedbackData.errorRequest"
        :messageRequest="feedbackData.feedbackMessage"
        @feedback:finished="removeFeedback"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { useStoreFeedback } from '~/store/useFeedback'

export default {
  name: "LayoutLogin",

  setup() {
    const feedbackStore = useStoreFeedback()

    return {
      feedbackStore
    }
  },

  computed: {
    feedbackData() {
      return this.feedbackStore.getFeedback
    }
  },

  methods: {
    removeFeedback() {
      setTimeout(() => {
        this.feedbackStore.setFeedback({
          isFeedbackActive: false,
          isError: false,
          feedbackMessage: ""
        })
      }, 400);
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  .info-system {
    background: $black;
    padding: rem(60);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info-user {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}
</style>
