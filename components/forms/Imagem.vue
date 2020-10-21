<template>
  <div class="imagem">
    <div
      :class="arquivo.isApi ? '' : 'preview__newImage'"
      :style="{
        'background-image': `url(${arquivo.preview})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      }"
      class="preview"
    >
      <div class="remove" @click.prevent="removeElement">
        X
      </div>

      <div v-if="!arquivo.isApi" class="salvar" @click.prevent="enviarFoto">
        ENVIAR
      </div>
    </div>
  </div>
</template>

<script>
import { axiosArquivos, formApi } from '~/plugins/axios'
export default {
  name: 'Imagem',
  props: {
    arquivo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeElement () {
      if (this.arquivo.isApi) {
        console.log('REMOVENDO NA API')
      } else {
        console.log('REMOVENDO DO ARRAY')
      }
    },
    async enviarFoto () {
      let body = {} // esse body é onde vai montar o corpo para `arquivofila`
      let fd = new FormData()
      fd.append('arquivo', this.arquivo.file)
      await axiosArquivos
        .post('/', fd, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=something'
          }
        })
        .then(res => {
          // aqui vai colocar o registro na api do outorga
          this.$emit('uploadedImage', this.index)
          body = {
            IdArquivo: res.data.result._id,
            IdFilaCepac: this.$route.params.id
          }
        })
        .catch(err => {
          console.log(err)
        })

      /* const { data } = await formApi.post('/arquivofila', body)
      console.log(data) */
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 5px;
  padding-top: 5px;
  padding-right: 5px;
  width: 200px;
  height: 125px;
  margin: 5px;

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 150px;
    margin: 5px 0px;
  }

  &__newImage {
    border: 2px solid #5cd6c9;
  }

  .remove {
    background-color: #eb5757;
    color: #fff;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    width: 20px;
    height: 20px;

    &:hover {
      cursor: pointer;
      background-color: #eb5756db;
    }
  }

  .salvar {
    background-color: #5cd6c9;
    border: none;
    border-radius: 2px;
    color: #fff;
    padding: 3px 7px;
    margin-bottom: 2px;

    &:hover {
      cursor: pointer;
      background-color: #5cd6c9db;
    }
  }
}
</style>
