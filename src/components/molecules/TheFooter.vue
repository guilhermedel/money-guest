<template>
  <footer class="footer">
    <div class="footer-background">
      <div class="footer-wrapper container">
        <div class="footer-info">
          <IconLogo />
          <TheParagraph :paragraph-message="$options.footerParagraph" bold />
        </div>
        <div class="footer-decoration">
          <IconClover />
        </div>
      </div>
    </div>
    <div class="footer-copy-background">
      <div class="footer-copy container">
        <TheParagraph :paragraph-message="$options.footerCopy" bold />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "TheFooter",

  footerParagraph:
    "Moneygest é uma ferramenta voltada para a gestão de sua renda, permitindo que você acompanhe seus gastos e administre melhor suas finanças.",

  footerCopy: "Copyright © 2024 Moneygest. Todos os direitos reservados."
}
</script>

<style lang="scss" scoped>
.footer {
  @include useAlignCenterBetween;
  flex-direction: column;
  padding: rem(16);
  margin-bottom: rem(16);
  position: relative;
  top: rem(75);

  .footer-background {
    border-top-left-radius: rem(8);
    border-top-right-radius: rem(8);
    width: 100%;
    @include useAlignCenterBetween;
    background: linear-gradient(
      0deg,
      rgba(244, 214, 255, 1) 10%,
      rgba(255, 255, 255, 1) 100%
    );

    .footer-wrapper {
      width: 100%;
      padding: rem(60) rem(24);
      @include useAlignCenterBetween;

      .footer-info {
        @include useAlignStartCenter;
        flex-direction: column;
        gap: rem(16);
        max-width: rem(400);
      }
    }
  }

  .footer-copy-background {
    width: 100%;
    background: $white;
    padding: 0 rem(24);
    border-bottom-left-radius: rem(8);
    border-bottom-right-radius: rem(8);

    .footer-copy {
      padding: rem(16) 0;
    }
  }
}
</style>
