<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.92651 3V21H20.524"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.5911 17V9"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.7029 17V5"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.8147 17V14"
      :stroke="strokeColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { useStrokeColor } from '~/composables/useStrokeColor';

export default {
  name: "IconBarChart",

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
