<template>
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.99991 5.6665L5.56221 0.999838L10.1245 5.6665"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.56225 1L5.56226 15"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { useStrokeColor } from "~/composables/useStrokeColor"

export default {
  name: "IconArrowUp",

  props: {
    iconColor: {
      type: String,
      default: "#000000"
    }
  },

  setup(props) {
    const { iconColor } = toRefs(props)
    const { strokeColor } = useStrokeColor(iconColor)

    return {
      strokeColor
    }
  }
}
</script>
