<template>
  <a class="user-profile__profile">
    <p>{{ name }}</p>
    <img v-if="imgPathIsKnown" :src="profileImageUrl" class="profile__image" @load="isLoaded">
    <user-profile-placeholder v-else />
  </a>
</template>
<script>
import { mapState } from 'vuex'
import UserProfilePlaceholder from '~/components/icons/UserProfilePlaceholder'

export default {
  name: 'UserAuth',
  components: {
    UserProfilePlaceholder
  },
  data () {
    return {
      imgPathIsKnown: false,
      imgLoading: false,
      name: 'Login',
      profileImageUrl: ''
    }
  },
  computed: {
    alt () { return `Imagem de ${this.name}` },
    ...mapState({
      error: state => state.error,
      userInfo: state => state.userInfo,
      userInfoIsSet: state => Object.keys(state.userInfo).length > 0,
      logged: state => state.logged
    })
  },
  watch: {
    userInfoIsSet (state) {
      if (state) {
        this.name = this.userInfo.NM_NOME
        this.imgPathIsKnown = true
        this.imgLoading = true
        this.profileImageUrl = `http://emurbsp12410/sp_urbanismo/rh/pessoal/${this.userInfo.NR_PRONTUARIO.replace(/\s/g, '')}.jpg`
      }
    }
  },
  methods: {
    isLoaded (event) {
      this.imgLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
$brand-1: #008375;
.user-profile__profile {
  display: flex;
  align-items: center;
  p {
    margin: 0 0.5rem;
  }
}
.profile__image {
  object-fit: cover;
  width: unset;
  border-radius: 32px;
}
</style>
