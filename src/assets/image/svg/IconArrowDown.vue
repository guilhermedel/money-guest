<template>
  <svg
    width="12"
    height="16"
    viewBox="0 0 17 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5685 15L8.72504 22L1.88159 15"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.7251 22V1"
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
  name: "IconArrowDown",

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
