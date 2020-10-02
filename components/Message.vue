<template>
  <div :style="{ top: thisHeight }" class="message">
    <main
      :class="{ error: error, fetching: isFetching, success: error === false }"
    >
      <div class="message__content">
        <p>{{ message }}</p>
        <button
          v-if="error === false"
          @click.prevent="goToRegistro(idCadastro)"
        >
          Acesse o novo registro
        </button>
      </div>
      <div class="message__actions">
        <button @click="$emit('close')" class="actions__item">
          Fechar
        </button>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    message: {
      type: String,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    },
    isFetching: {
      type: Boolean,
      required: true
    },
    idCadastro: {
      type: Number,
      required: true
    }
  },
  computed: {
    thisHeight () {
      return Math.abs(document.body.getBoundingClientRect().top) + 'px'
    }
  },
  methods: {
    goToRegistro (id) {
      document.body.style.overflow = 'auto'
      if (id) {
        this.$router.push({ path: `/cadastro/${id}` })
      } else {
        throw new Error(`Valor de id não pode ${id}`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes godark {
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.48);
  }
}
@keyframes surge {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.message {
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
  animation: godark ease-out 0.4s;
  main {
    width: 30%;
    padding: 1.5rem 2rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
    border-top: 0.5rem solid transparent;
    animation: surge ease-out 0.4s;
    .message__content {
      p {
        font-size: 1.25rem;
      }
      & > a {
        display: block;
        color: #008375;
        text-decoration: none;
        font-size: 1.25rem;
        margin: 0.5rem 0;
      }
      & > button {
        border: none;
        padding: 1rem 1.5rem;
        margin: 1rem 0;
        text-decoration: none;
        background: #008375;
        color: #ffffff;
        font-family: inherit;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        text-align: center;
        border-radius: 4px;
      }
    }
    .message__actions button {
      background-color: transparent;
      border: none;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      margin-right: 1rem;
      color: #008375;
      cursor: pointer;
      transition: all ease-out 0.2s;
      &:hover {
        color: #000;
      }
    }
    &.fetching {
      border-top-color: #000;
    }
    &.error {
      border-top-color: #eb5757;
    }
    &.success {
      border-top-color: #008375;
    }
  }
}
</style>
