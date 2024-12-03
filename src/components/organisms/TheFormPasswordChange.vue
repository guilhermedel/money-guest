<template>
  <section class="form-profile">
    <div class="profile-header">
      <TheTitleSection title-message="Alterar Senha" />
      <TheParagraph paragraph-message="Aqui você pode alterar sua senha." />
      <TheDivider class="divider" />
    </div>
    <form class="form">
      <TheInputField
        is-label
        input-type="password"
        input-id="password"
        input-name="Senha"
        input-placeholder="Digite sua senha..."
      />
      <TheInputField
        is-label
        input-type="password"
        input-id="repeat-password"
        input-name="Repita sua senha"
        input-placeholder="Digite sua senha..."
      />
      <TheButtonForm button-message="Atualizar Senha" is-button-small />
    </form>
  </section>
</template>

<script lang="ts">
export default {
  name: "TheFormProfile"
}
</script>

<style lang="scss" scoped>
.form-profile {
  margin-top: rem(24);
  width: 100%;

  .profile-header {
    max-width: rem(768);
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(16);

    .divider {
      margin-top: rem(16);
    }
  }

  .form {
    margin-top: rem(32);
    padding-right: rem(96);
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(32);
  }
}
</style>
