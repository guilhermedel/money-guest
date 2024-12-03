<template>
  <div>
    <TheFeedback
      v-if="feedbackData.isFeedbackActive"
      :error-request="feedbackData.errorRequest"
      :messageRequest="feedbackData.feedbackMessage"
      @feedback:finished="removeFeedback"
    />
    <TheHeader :user-data="userStore.user"/>
    <div class="content">
      <div class="container">
        <slot></slot>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import { useStoreFeedback } from '~/store/useFeedback'
import { useStoreProfile } from '~/store/useProfile'

export default {
  name: "LayoutDefault",

  setup() {
    const feedbackStore = useStoreFeedback()
    const userStore =  useStoreProfile()

    return {
      feedbackStore,
      userStore
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
      }, 400)
    }
  },

  mounted() {
    this.$nextTick(async () => {
      const userId: string = window.localStorage.getItem('userId') || ''
      await this.userStore.getUser(userId)
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 rem(16);
  margin: 0 auto;
}
</style>
