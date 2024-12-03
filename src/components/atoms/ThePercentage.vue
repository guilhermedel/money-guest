<template>
  <span class="percentage" :class="status">{{ percentageValue }}</span>
</template>

<script lang="ts">
export default {
  name: "ThePercentage",

  props: {
    percentage: {
      type: [ Number, String ],
      required: true
    },
    status: {
      type: String,
      required: true,
      validator: (value: string) => {
        return ['critical', 'high', 'moderate', 'low'].includes(value)
      }
    }
  },

  computed: {
    percentageValue(): string {
      return `${this.percentage}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.percentage {
  font-size: rem(14);
  font-weight: bold;

  &.critical {
    color: $red;
  }

  &.high {
    color: $yellow;
  }

  &.moderate {
    color: $purple;
  }

  &.low {
    color: $green
  }
}
</style>