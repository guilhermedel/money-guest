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
        ref="inputAge"
        input-type="text"
        input-id="age"
        input-validate="age"
        input-name="Idade"
        input-placeholder="Digite sua idade..."
        :is-input-disabled="loadingRequest"
        v-model="user.age"
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
          select-name="gender"
          select-id="gender"
          v-model="user.gender"
          :select-options="selectOptions"
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
    </form>
  </div>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import { useStoreProfile } from "~/store/useProfile"
import TheInputField from "~/components/molecules/TheInputField.vue";
import { addFeedback } from "~/utils/addFeedback";

export default {
  name: "PageRegister",

  data() {
    return {
      loadingRequest: false as boolean,
      user: {
        name: "",
        age: "",
        email: "",
        dateBirthday: "",
        gender: "",
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
      const createUser = {
        ...this.user,
        age: Number(this.user.age)
      }

      if(this.isValidateFormRequest()) {
        await this.storeProfile.registerUser(createUser)
      }

      this.loadingRequest = false

      this.$router.push('/home')
    },
    isValidateFormRequest(): boolean {
      const inputName = this.$refs.inputName as typeof TheInputField
      const inputAge = this.$refs.inputAge as typeof TheInputField
      const inputEmail = this.$refs.inputEmail as typeof TheInputField
      const inputDateBirthday = this.$refs.inputDateBirthday as typeof TheInputField
      const inputPassword = this.$refs.inputPassword as typeof TheInputField
      const inputConfirmPassword = this.$refs.inputConfirmPassword as typeof TheInputField
      
      const name = inputName.validate()
      const age = inputAge.validate()
      const email = inputEmail.validate()
      const dateBirthday = inputDateBirthday.validate()
      const password = inputPassword.validate()
      const confirmPassword = inputConfirmPassword.validate()
      
      const isValidRequest = (
        name
        && age
        && email
        && dateBirthday
        && password
        && confirmPassword
      )

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
