<template>
  <div class="input-field">
    <label v-if="isLabel" class="label" :for="inputId">
      {{ inputName }}
    </label>
    <input
      v-if="isMask"
      v-model="inputValue"
      v-mask="inputMask"
      class="input"
      :class="{ disabled: isInputDisabled }"
      :type="inputType"
      :id="inputId"
      :placeholder="inputPlaceholder"
      :disabled="isInputDisabled"
      :onBlur="onBlur"
      @input="handleInputData"
    />
    <input
      v-else-if="isMoney"
      v-model="inputMoney"
      class="input"
      :class="{ disabled: isInputDisabled }"
      :type="inputType"
      :id="inputId"
      :placeholder="inputPlaceholder"
      :disabled="isInputDisabled"
      @input="handleInputData"
    />
    <input
      v-else
      v-model="inputValue"
      class="input"
      :class="{ disabled: isInputDisabled }"
      :type="inputType"
      :id="inputId"
      :placeholder="inputPlaceholder"
      :disabled="isInputDisabled"
      :onBlur="onBlur"
      @input="handleInputData"
    />
    <p v-show="error" class="error">{{ error }}</p>
    <TheParagraph v-if="isInputMessage" :paragraph-message="inputMessage" />
  </div>
</template>

<script lang="ts">
import useForm from "~/composables/useForm"
import { useCurrencyFormat } from "~/composables/useCurrencyFormat";

export default {
  name: "TheInputField",

  props: {
    isLabel: {
      type: Boolean,
      default: false
    },
    isInputMessage: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      required: true,
      validation: (value: string) =>
        ["number", "text", "password", "email"].includes(value)
    },
    inputId: {
      type: String || Number,
      required: true
    },
    inputName: {
      type: String,
      required: true
    },
    inputPlaceholder: {
      type: String,
      default: ""
    },
    inputMessage: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    isMask: {
      type: Boolean,
      required: false
    },
    inputMask: {
      type: String,
      default: null
    },
    isValidate: {
      type: Boolean,
      default: false
    },
    inputValidate: {
      type: String,
      required: false,
      validation: (value: string): boolean =>
        ["name", "number", "age", "password", "email"].includes(value)
    },
    isInputDisabled: {
      type: Boolean,
      default: false
    },
    isMoney: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },

  watch: {
    value(newValue) {
      if(this.isMoney) this.inputMoney = newValue
      this.inputValue = newValue
    },
    inputMoney(moneyValue) {
      if(typeof moneyValue === 'string')
        this.inputValue = +moneyValue.replace('R$', '').replaceAll('.','').replace(',','')
    }
  },

  setup(props) {
    const { inputValue, error, validate, onBlur } = useForm(props.inputValidate || false)
    const { inputMoney, formatCurrency } = useCurrencyFormat()

    return {
      inputValue,
      error,
      validate,
      onBlur,
      inputMoney,
      formatCurrency
    }
  },

  methods: {
    handleInputData(event: Event): void {
      if(this.isMoney) this.formatCurrency(this.inputMoney)
      const target = event.target as HTMLInputElement

      this.$emit("update:modelValue", target.value)
    }
  },

  mounted() {
    if(!!this.value) this.inputValue = this.value
    
    if(!!this.value && this.isMoney) {
      this.inputMoney = String(this.value)
      this.formatCurrency(this.inputMoney)
    }

    this.$emit("update:modelValue", this.value)
  }
}
</script>

<style lang="scss" scoped>
.input-field {
  @include useAlignStartCenter;
  flex-direction: column;
  gap: rem(8);
  width: 100%;

  .label {
    font-size: rem(14);
    color: $blackAlt;
  }

  .input {
    @include theInputStyle;
  }

  .error {
    color: $red;
    font-size: rem(14);
    margin-top: rem(4);
  }
}
</style>
