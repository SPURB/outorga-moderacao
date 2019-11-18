<template>
  <div class="message" :class="{ 'error': error, 'fetching': isFetching }">
    <div class="message__content">
      {{ message }}
    </div>
    <div class="message__actions">
      <button class="actions__item" @click="$emit('close')">
        Fechar
      </button>
    </div>
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
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  margin: 0;
  padding: 2rem;
  border: 1rem solid;
  &.error { border-color: red }
}
</style>
