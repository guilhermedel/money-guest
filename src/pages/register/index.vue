<template>
  <div class="register">
    <div class="register-header">
      <TheTitlePage title-message="Crie sua conta na nossa plataforma" />
      <TheParagraph
        paragraph-message="Insira abaixo suas informações para cria a conta."
      />
    </div>
    <form class="register-form">
      <TheInputField
        class="form-input"
        ref="inputName"
        input-type="text"
        input-id="name"
        input-validate="name"
        input-name="Nome"
        input-placeholder="Digite seu nome..."
        :is-input-disabled="loadingRequest"
        v-model="user.name"
      />
      <TheInputField
        class="form-input"
        ref="inputEmail"
        input-type="email"
        input-id="email"
        input-validate="email"
        input-name="Email"
        input-placeholder="name@example.com"
        :is-input-disabled="loadingRequest"
        v-model="user.email"
      />
      <div class="form-two-field">
        <TheInputField
          ref="inputDateBirthday"
          is-mask
          input-type="text"
          input-id="date-birthday"
          input-validate="date-birthday"
          input-name="Data de Nascimento"
          input-placeholder="Digite sua data de nascimento..."
          input-mask="##/##/####"
          :is-input-disabled="loadingRequest"
          v-model="user.dateBirthday"
        />
        <TheSelect
          ref="selectGender"
          is-validate
          select-name="gender"
          select-id="gender"
          :is-input-disabled="loadingRequest"
          :select-options="selectOptions"
          v-model="user.gender"
        />
      </div>
      <div class="form-two-field">
        <TheInputField
          ref="inputPassword"
          input-type="password"
          input-id="password"
          input-validate="password"
          input-name="Senha"
          input-placeholder="Digite sua senha..."
          :is-input-disabled="loadingRequest"
          v-model="user.password"
        />
        <TheInputField
          ref="inputConfirmPassword"
          input-type="password"
          input-id="confirm-password"
          input-validate="password"
          input-name="Senha"
          input-placeholder="Digite novamente sua senha..."
          :is-input-disabled="loadingRequest"
          v-model="user.confirmPassword"
        />
      </div>
      <TheButtonForm
        class="form-button"
        :is-disabled="loadingRequest"
        button-message="Criar conta"
        @button:click="handleClickRegister"
      />
      <TheButtonForm
        class="form-button"
        buttonCancel
        button-message="Voltar"
        :is-disabled="loadingRequest"
        @button:click="handleClickGoBack"
      />
    </form>
  </div>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import { useStoreProfile } from "~/store/useProfile"
import { addFeedback } from "~/utils/addFeedback";

export default {
  name: "PageRegister",

  data() {
    return {
      loadingRequest: false as boolean,
      user: {
        name: "",
        email: "",
        dateBirthday: "",
        gender: "M",
        password: "",
        confirmPassword: ""
      },
      selectOptions: [
        {
          value: "",
          label: "Selecione o gênero"
        },
        {
          value: "M",
          label: "Masculino"
        },
        {
          value: "F",
          label: "Feminino"
        }
      ] as ISelectOptionsProp[]
    }
  },

  setup() {
    definePageMeta({
      layout: "login"
    })

    const storeProfile = useStoreProfile()

    return {
      storeProfile
    }
  },

  methods: {
    async handleClickRegister(): Promise<void> {
      this.loadingRequest = true
      
      if(this.isValidateFormRequest()) {
        await this.storeProfile.registerUser(this.user)
        this.$router.push('/home')
      }
      
      this.loadingRequest = false
      
    },
    isValidateFormRequest(): boolean {
      const refArray = Object.values(this.$refs)
      const isValid = useFormValidation(refArray)
      
      return isValid
    },
    handleClickGoBack() {
      this.$router.push('/login')
    }
  },

  beforeMount() {
    const isAuthorization = auth()

    if(isAuthorization) {
      addFeedback({
        isFeedbackActive: true,
        isError: true,
        feedbackMessage: "Usuário não tem permissão."
      })
      
      this.$router.push('/home') 
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: rem(600);
  @include useAlignStartCenter;
  flex-direction: column;

  .register-header {
    width: 100%;
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(8);
  }

  .register-form {
    width: 100%;
    margin-top: rem(20);

    .form-input {
      + .form-input {
        margin-top: rem(8);
      }
    }

    .form-two-field {
      margin: rem(8) 0;
      @include useAlignBaselineCenter;
      gap: rem(8);
    }

    .form-button {
      margin-top: rem(20);
    }
  }
}
</style>
