<template>
  <div class="select-field">
    <label v-if="isLabel" class="label" :for="selectId">
      {{ selectName }}
    </label>
    <select
      class="select"
      :name="selectName"
      :id="selectId"
      :value="inputValue"
      :disabled="isSelectDisabled"
      @input="handleSelectData"
    >
      <option
        v-for="(option, optionIndex) in selectOptions"
        :key="optionIndex"
        :disabled="optionIndex === 0"
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>
    <p v-show="error" class="error">{{ error }}</p>
    <TheParagraph v-if="isSelectMessage" :paragraph-message="selectMessage" />
  </div>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"

export default {
  name: "TheSelect",

  props: {
    isLabel: {
      type: Boolean,
      default: false
    },
    isSelectMessage: {
      type: Boolean,
      default: false
    },
    selectName: {
      type: String,
      required: true
    },
    selectId: {
      type: String,
      required: true
    },
    selectOptions: {
      type: Array as () => ISelectOptionsProp[],
      default: () => [] as ISelectOptionsProp[]
    },
    selectMessage: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      required: true
    },
    isValidate: {
      type: Boolean,
      default: false
    },
    isSelectDisabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const { inputValue, error, validate } = useForm(props.isValidate ? "select" : false)

    return {
      inputValue,
      error,
      validate,
    }
  },

  watch: {
    modelValue(newValue: string): void {
      this.inputValue = newValue
    },
    value(newValue): void {
      this.inputValue = newValue
    }
  },

  methods: {
    handleSelectData(event: Event): void {
      const target = event.target as HTMLSelectElement
      this.$emit("update:modelValue", target.value)
    }
  },

  mounted() {
    this.inputValue = this.value
    this.$emit("update:modelValue", this.value)
  }
}
</script>

<style lang="scss" scoped>
.select-field {
  @include useAlignStartCenter;
  flex-direction: column;
  gap: rem(8);
  width: 100%;

  .select {
    @include theInputStyle;
  }

  .label {
    font-size: rem(14);
    color: $blackAlt;
  }

  .error {
    color: $red;
    font-size: rem(14);
    margin-top: rem(4);
  }
}
</style>
