<template>
  <div v-scroll-lock="!success" class="user-auth modal">
    <transition name="fade">
      <div v-if="error.status" class="user-auth__load">
        <h3 class="error__title">
          Erro!
        </h3>
        <p class="error__message">
          {{ error.response }}<br>
        </p>
        <p>Não autorizado. Solicite acesso com NTI e DGO/SPURB</p>
        <button class="error__contact" @click.prevent="copy($event,'desenvolvimento@spurbanismo.sp.gov.br')">
          desenvolvimento@spurbanismo.sp.gov.br
        </button>
      </div>
      <div v-else class="user-auth__load">
        <p class="user-auth--fetching">
          Verificando usuário
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { axiosUserInfo, axiosUserId } from '~/plugins/axios'
const formModel = () => {
  return {
    nProdam: '',
    btnText: 'Login',
    success: false
  }
}

export default {
  name: 'UserAuth',
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
    else {
      axiosUserId('/')
        .then((res) => {
          this.nProdam = res.data
          this.getUser(res.data)
        })
        .catch(error => this.setError(error))
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
    copy (event, text) {
      try {
        navigator.clipboard.writeText(text)
        event.target.innerHTML = 'Email copiado'
        event.target.classList.add('disabled')
        event.target.setAttribute('disabled', 'disabled')
      }
      catch (err) {
        console.error('Failha ao copiar', err)
      }
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
      this.SET_ERROR({ response: error, status: true })
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

.error__title {
  margin-bottom: 1rem;
  color: #EB5757;
}

.error__contact {
  text-decoration: none;
  color: grey;
  padding: 1rem;
  background: lightgrey;
  border-radius: 5px;
  border: 0;
  margin-top: 1rem;
  transition: all 0.35s;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    background: darkgrey;
    color: #000;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
  }
  &:disabled {
    cursor: unset;
    background: lightgrey;
    color: #000;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
}

.user-auth__load {
  background: #fff;
  padding: 1rem;
  padding: 1.5rem;
  text-align: center;
  border-radius: 10px;
  line-height: 1.62;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
}

.error__message {
  font-weight: 700;
  border: 1px solid #EB5757;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #EB5757;
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
