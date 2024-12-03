<template>
  <div class="account-verification">
    <div class="account-verification-header">
      <TheTitlePage title-message="Verificação de conta" />
      <TheParagraph paragraph-message="Você recebera uma mensagem no seu email com um codigo para verficar sua conta." />
    </div>
    <form class="account-verification-form">
      <TheInputField
        class="form-input"
        input-type="email"
        input-id="email"
        input-name="Email"
        input-placeholder="name@example.com"
        v-model="user.code"
      />
      <TheButtonForm class="form-button" button-message="Verificar conta" />
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "Pageaccount-verification",

  data() {
    return {
      user: {
        code: ""
      }
    }
  },

  setup() {
    definePageMeta({
      layout: "login"
    })
  }
}
</script>

<style lang="scss" scoped>
.account-verification {
  width: rem(600);
  @include useAlignStartCenter;
  flex-direction: column;

  .account-verification-header {
    width: 100%;
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(8);
  }

  .account-verification-form {
    width: 100%;
    margin-top: rem(20);

    .form-button {
      margin-top: rem(20);
    }
  }
}
</style>
