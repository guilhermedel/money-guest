<template>
  <div class="icon-user">
    <p class="letter-name">{{ firstLetterName }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheFirstLetterName",

  props: {
    userName: {
      type: String,
      required: true
    }
  },

  computed: {
    firstLetterName() {
      return this.userName?.toUpperCase()[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-user {
  width: rem(40);
  height: rem(40);
  background: $black;
  border-radius: rem(4);
  @include useAlignCenter;

  .letter-name {
    font-size: rem(20);
    color: $white;
  }
}
</style>
