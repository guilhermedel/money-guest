<template>
  <section class="big-card">
    <div class="card-header" v-if="isHeader">
      <TheTitleSection :title-message="titleCard" />
      <TheParagraph :paragraph-message="paragraphCard" />
    </div>
    <Transition name="bigCard" mode="out-in">
      <div class="card-transition">
        <slot class="card-slot"></slot>
        <TheButtonLinkCard
          v-if='isButtonLink'
          :button-message="buttonLinkMessage"
          @button:click="handleClick"
        />
      </div>
    </Transition>
  </section>
</template>

<script lang="ts">
export default {
  name: "TheBigCard",

  props: {
    titleCard: {
      type: String,
      default: ""
    },
    paragraphCard: {
      type: String,
      default: ""
    },
    buttonLinkMessage: {
      type: String,
      default: ""
    },
    isButtonLink: {
      type: Boolean,
      default: true
    },
    isHeader: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleClick() {
      this.$emit("big-card:click")
    }
  }
}
</script>

<style lang="scss" scoped>
.big-card {
  background: $white;
  padding: rem(24);
  border-radius: rem(12);
  @include useAlignStartCenter;
  flex-direction: column;

  .card-header {
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(10);
    margin-bottom: rem(30);
  }

  .card-transition {
    flex-grow: 1;
    width: 100%;
    @include useAlignStartBetween;
    flex-direction: column;

    .card-slot {
      max-height: rem(300);
      overflow-y: scroll;
    }
  }
}

.bigCard-enter-from {
  transform: translate3d(0, rem(20), 0);
  filter: blur(2px);
  opacity: 0;
}

.bigCard-enter-to {
  transform: translate3d(0, 0, 0);
  filter: blur(0);
  opacity: 1;
}

.bigCard-leave-from {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  filter: blur(0);
}

.bigCard-leave-to {
  transform: translate3d(0, rem(-20), 0);
  opacity: 0;
  filter: blur(2px);
}

.bigCard-enter-active,
.bigCard-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
</style>
