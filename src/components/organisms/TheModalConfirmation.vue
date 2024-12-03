<template>
  <transition name="modal-content">
    <div v-if="isOpened" class="modal-overlay">
      <div class="modal-content">
        <TheTitlePage :title-message="titleConfirmation" class="modal-title" />
        <TheParagraph :paragraph-message="paragraphConfirmation" />
        <div class="modal-buttons">
          <TheButtonForm
            button-message="Salvar"
            is-button-small
            :is-disabled="isDisabled"
            @button:click="handleSubmit"
          />
          <TheButtonForm
            button-message="Cancelar"
            button-cancel
            is-button-small
            :is-disabled="isDisabled"
            @button:click="handleClose"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "TheModalFormConfirmation",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    titleConfirmation: {
      type: String,
      required: true
    },
    paragraphConfirmation: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClose() {
      this.$emit("modal-confirmation:close")
    },
    handleSubmit() {
      this.$emit("modal-confirmation:submit")
    },
    handleModalOutside(event: MouseEvent): void {
      const target = event.target as HTMLElement
      
      const isModal = target.classList.contains("modal-overlay")

      if (isModal) this.handleClose()
    }
  },

  mounted() {
    document.addEventListener("click", this.handleModalOutside)
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleModalOutside)
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  @include useAlignCenter;
  z-index: 1;

  .modal-content {
    width: rem(600);
    background: $white;
    padding: rem(32);
    border-radius: rem(8);
    position: relative;

    .modal-title {
      margin-bottom: rem(20);
    }

    .modal-close {
      position: absolute;
      top: rem(16);
      right: rem(16);
    }

    .modal-buttons {
      margin-top: rem(20);
      @include useAlignCenterEnd;
      gap: rem(16);
    }
  }
}

.modal-content-enter-from {
  transform: translate3d(0, rem(-20), 0);
  filter: blur(2px);
  opacity: 0;
}

.modal-content-enter-to {
  transform: translate3d(0, 0, 0);
  filter: blur(0);
  opacity: 1;
}

.modal-content-leave-from {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  filter: blur(0);
}

.modal-content-leave-to {
  transform: translate3d(0, rem(-20), 0);
  opacity: 0;
  filter: blur(2px);
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
</style>
