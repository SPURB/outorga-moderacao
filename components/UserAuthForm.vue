<template>
  <div v-scroll-lock="!success" class="user-auth-form">
    <validation-observer v-slot="{ invalid }" tag="div" class="auth-form__login">
      <form class="auth-form__form" @submit.prevent="getUser(nProdam)">
        <label for="nr-prodam">Inclua seu número da rede</label>
        <validation-provider v-slot="{ errors }" rules="required|min:3" name="nr-prodam" tag="div" class="form__login">
          <input
            v-model="nProdam"
            class="login__input"
            tabindex="10000"
            type="text"
            name="nr-prodam"
            placeholder="e054321"
          >
          <span class="login__error">{{ errors[0] }}</span>
        </validation-provider>

        <button class="auth-form__btn" type="submit" :disabled="invalid" tabindex="10001">
          {{ btnText }}
        </button>
      </form>
    </validation-observer>
    <p v-if="fetching" class="auth-form__login--fetching">
      Carregando
    </p>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { axiosUserInfo } from '~/plugins/axios'
const formModel = () => {
  return {
    nProdam: '',
    btnText: 'Login',
    success: false
  }
}

export default {
  name: 'UserAuthForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return formModel()
  },
  computed: {
    ...mapState({
      logged: state => state.logged,
      error: state => state.error,
      fetching: state => state.fetching
    })
  },
  mounted () {
    const nProdam = localStorage.getItem('nr_prodam')
    if (nProdam !== null) {
      this.nProdam = nProdam
      this.getUser(nProdam)
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN_STATE', 'SET_ERROR', 'SET_FETCHING_STATE', 'SET_USER_INFO']),
    getUser (nProdam) {
      this.SET_FETCHING_STATE(true)
      axiosUserInfo(`?NM_PRODAM=${nProdam}`)
        .then((res) => { this.setUser(res.data) })
        .catch((error) => { this.setError(error) })
    },
    setUser (userData) {
      this.SET_FETCHING_STATE(false)
      const isValidUser = this.checkUser(userData)

      if (isValidUser) {
        this.success = true
        this.SET_LOGIN_STATE(true)
        this.SET_USER_INFO(userData[0])
        this.$router.push({ query: { user: this.nProdam, isAdmin: true } })
        localStorage.setItem('nr_prodam', this.nProdam)
      }
      else {
        this.SET_LOGIN_STATE(false)
        this.success = false
        this.btnText = 'Tentar novamente'
      }
    },
    setError (error) {
      this.SET_FETCHING_STATE(false)
      this.reset()
      this.SET_ERROR(error)
    },
    checkUser (userData) {
      if (userData.length === 0) { return false }
      else { return true } // incluir aqui a validação
    },
    reset () {
      Object.assign(this.$data, formModel())
      localStorage.clear()
    }
  }
}
</script>
<style lang="scss" scoped>

.user-auth-form {
  position: absolute;
  z-index: 2000;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  align-items: center;
}

.auth-form__login {
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  min-width: 530px;
}

.login__input {
 padding: 0.5rem;
 margin: 0.5rem 0 0;
 border-radius: 5px;
 border: solid 1px grey;
}

.auth-form__btn {
  margin: 1rem 0 0.8rem;
  width: 100%;
  border: 0;
  opacity: 0.8;
  padding: 1rem 1.25rem;
  font-family: inherit;
  cursor: pointer;
  border-radius: 5px;
  background-color: #008375;
  color: #fff;
  transition: all ease-out .2s;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    background-color: #BDBDBD;
    cursor: unset;
    opacity: 0.8;
  }
}

.login__error {
  margin-left: 0.5rem;
}

</style>
