<template>
  <div v-scroll-lock="!success" class="user-auth">
    <transition name="fade">
      <div class="user-auth__load">
        <p class="user-auth--fetching">
          Verificando usuário
        </p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="error.status" class="user-auth__load">
        <p class="error__message">
          {{ error.response }}<br>
        </p>
        <p>Não autorizado. Solicite acesso com NTI e DGO/SPURB</p>
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

.user-auth {
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

.user-auth__load {
  background: #fff;
  padding: 1rem;
  padding: 1.5rem;
  text-align: center;
  border-radius: 10px;
  line-height: 1.62;
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
