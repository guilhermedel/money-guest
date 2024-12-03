<template>
  <div class="login">
    <div class="login-header">
      <TheTitlePage title-message="Login" />
      <TheParagraph paragraph-message="Insira seu e-mail abaixo para fazer login" />
    </div>
    <form class="login-form">
      <TheInputField
        ref="inputEmail"
        class="form-input"
        input-type="email"
        input-id="email"
        input-validate="email"
        input-name="Email"
        input-placeholder="name@example.com"
        :is-input-disabled="loadingRequest"
        v-model="user.email"
      />
      <TheInputField
        class="form-input"
        ref="inputPassword"
        input-type="password"
        input-id="password"
        input-validate="password"
        input-name="Senha"
        input-placeholder="Digite sua senha..."
        :is-input-disabled="loadingRequest"
        v-model="user.password"
      />
      <TheButtonForm
        class="form-button"
        button-message="Entrar"
        :is-disabled="loadingRequest"
        @button:click="handleClickSend"/>
    </form>
    <div class="login-register">
    <div class="register-message">
      <TheTitlePage title-message="Cadastre-se" />
      <TheParagraph paragraph-message="Ainda não possui conta? Cadastre-se no site" />
    </div>
      <TheButtonForm
        class="register-button"
        button-message="Cadastro"
        :is-disabled="loadingRequest"
        @button:click="handleClickRegister"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStoreProfile } from "~/store/useProfile"
import { addFeedback } from "~/utils/addFeedback";
import TheInputField from "~/components/molecules/TheInputField.vue"

export default {
  name: "PageLogin",

  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      loadingRequest: false as boolean
    }
  },

  setup() {
    definePageMeta({
      layout: "login",
    })

    const storeProfile = useStoreProfile()

    return {
      storeProfile,
    }
  },

  methods: {
    async handleClickSend(): Promise<void> {
      this.loadingRequest = true
      if(this.isValidateFormRequest()) {
        await this.storeProfile.userLogin(this.user)
        this.$router.push('/home')
      }

      this.loadingRequest = false
    },
    handleClickRegister(): void {
      this.$router.push('/register')
    },
    isValidateFormRequest(): boolean {
      const inputEmail = this.$refs.inputEmail as typeof TheInputField
      const inputPassword = this.$refs.inputPassword as typeof TheInputField
      
      const email = inputEmail.validate()
      const password = inputPassword.validate()
      
      const isValidRequest = email && password

      return isValidRequest
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
.login {
  width: rem(600);
  @include useAlignStartCenter;
  flex-direction: column;

  .login-header {
    width: 100%;
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(8);
  }

  .login-form {
    width: 100%;
    margin-top: rem(20);

    .form-input {
      + .form-input {
        margin-top: rem(8);
      }
    }

    .form-button {
      margin-top: rem(20);
    }
  }

  .login-register {
    margin-top: rem(60);
    width: 100%;

    .register-message {
      @include useAlignStartCenter;
      flex-direction: column;
      gap: rem(8);
    }

    .register-button {
      margin-top: rem(20);
    }
  }
}
</style>
