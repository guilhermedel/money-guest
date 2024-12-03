<template>
  <div class="feedback" :class="feedbackClasses">
    <TheParagraphFeedback :paragraph-message="messageRequest" />
  </div>
</template>

<script lang="ts">
export default {
  name: "TheFeedback",

  props: {
    errorRequest: {
      type: Boolean,
      default: false
    },
    messageRequest: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      feedbackApp: "start"
    }
  },

  computed: {
    feedbackClasses() {
      return {
        start: this.feedbackApp === "start",
        end: this.feedbackApp === "end",
        success: !this.errorRequest,
        error: this.errorRequest
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.feedbackApp = "end"
      this.$emit("feedback:finished")
    }, 5000)
  }
}
</script>


<style lang="scss" scoped>
.feedback {
  border-radius: rem(8);
  padding: rem(16) rem(20);
  position: absolute;
  top: 0;
  right: rem(24);
  width: rem(320);
  z-index: 999;
  
  &.success {
    background: $green;
  }

  &.error {
    background: $red;
  }

  &.start {
    animation: animeStart 0.3s forwards;
  }

  &.end {
    animation: animeEnd 0.3s forwards;
  }
}

@keyframes animeStart {
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(40%);
  }
}

@keyframes animeEnd {
  from {
    opacity: 1;
    transform: translateY(40%);
  }
  to {
    opacity: 0;
    transform: translateY(-50%);
    display: none;
  }
}
</style>