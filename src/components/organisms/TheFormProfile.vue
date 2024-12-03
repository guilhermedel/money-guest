<template>
  <section class="form-profile">
    <div class="profile-header">
      <TheTitleSection title-message="Perfil" />
      <TheParagraph
        paragraph-message="Aqui você pode gerenciar o seu perfil e editar informações."
      />
      <TheDivider class="divider" />
    </div>
    <form class="form">
      <TheInputField
        ref="inputName"
        is-label
        is-input-message
        input-type="text"
        input-id="name"
        input-name="Nome de usuário"
        input-placeholder="Digite seu nome..."
        input-message="Altere seu nome de usuário aqui. Pode ser seu nome real ou um pseudônimo."
        input-validate="name"
        :value="userData.name"
        v-model="user.name"
      />
      <TheInputField
        ref="inputDateBirthday"
        is-label
        is-mask
        is-input-message
        input-mask="##/##/####"
        input-type="text"
        input-id="date-birthday"
        input-name="Data de Nascimento"
        input-placeholder="Digite sua idade..."
        input-message="A sua data de nascimentos só pode ser alterada uma única vez."
        input-validate="date-birthday"
        :value="userData.dateBirthday"
        v-model="user.dateBirthday"
      />
      <TheSelect
        ref="inputGender"
        is-label
        is-select-message
        is-validate
        select-name="Gênero"
        select-id="gender"
        select-message="Altere o seu gênero aqui."
        :select-options="selectOptions"
        :value="userData.gender"
        v-model="user.gender"
      />
      <TheInputField
        ref="inputEmail"
        is-label
        is-input-message
        input-type="email"
        input-id="email"
        input-name="Email"
        input-placeholder="Digite seu email..."
        input-message="Altere seu email de usuário aqui."
        input-validate="email"
        :value="userData.email"
        v-model="user.email"
      />
      <TheButtonForm button-message="Atualizar Perfil" is-button-small @button:click="handleSubmit" />
    </form>
  </section>
</template>

<script lang="ts">
import type { ISelectOptionsProp } from "~/interface/atoms/TheSelect"
import type { IUserData } from "~/interface/pages/user"
import { useFormValidation } from '~/composables/useFormValidation'

export default {
  name: "TheFormProfile",

  props: {
    userData: {
      type: Object as () => IUserData,
      default: () => ({} as IUserData)
    }
  },

  data() {
    return {
      user: {
        name: "",
        email: "",
        dateBirthday: "",
        gender: "",
      } as IUserData,
      selectOptions: [
        {
          value: "",
          label: "Selecione uma opção"
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

  methods: {
    handleSubmit() {
      if(this.isValidateFormRequest())
        this.$emit("form-profile:submit", this.user)
    },
    isValidateFormRequest(): boolean {
      const refArray = Object.values(this.$refs)
      const isValid = useFormValidation(refArray)

      return isValid
    }
  }
}
</script>

<style lang="scss" scoped>
.form-profile {
  margin-top: rem(24);
  width: 100%;

  .profile-header {
    max-width: rem(768);
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(16);

    .divider {
      margin-top: rem(16);
    }
  }

  .form {
    margin-top: rem(32);
    padding-right: rem(96);
    @include useAlignStartCenter;
    flex-direction: column;
    gap: rem(32);
  }
}
</style>
