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
  computed: {
    UsuarioAlteracao () {
      return this.$store.state.userInfo.NM_PRODAM
    }
  },
  methods: {
    async removeElement () {
      if (this.arquivo.isApi) {
        try {
          formApi.defaults.headers.common.Authorization = this.UsuarioAlteracao
          const arquivoApi = await axiosArquivos.delete(
            `/arquivos/api/${this.arquivo.props.IdArquivo}`
          )
          const arquivoFila = await formApi.delete(
            `/arquivofila/${this.arquivo.props.id}`
          )

          if (arquivoApi.status === 200 && arquivoFila.status === 200) {
            this.$emit('remove', this.index)
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        this.$emit('remove', this.index)
      }
    },
    async enviarFoto () {
      let body = {} // esse body é onde vai montar o corpo para `arquivofila`
      let fd = new FormData()
      fd.append('arquivo', this.arquivo.file)
      await axiosArquivos
        .post('/arquivos/api/', fd, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=something'
          }
        })
        .then(res => {
          body = {
            IdArquivo: res.data.result._id,
            IdFilaCepac: this.$route.params.id
          }
        })
        .catch(err => {
          console.log(err)
        })

      formApi.defaults.headers.common.Authorization = this.UsuarioAlteracao
      await formApi
        .post('/arquivofila', body)
        .then(res => {
          this.$emit('uploadedImage', {
            IdArquivo: body.IdArquivo,
            indice: this.index,
            id: res.data.Id
          })
        })
        .catch(err => console.log(err))
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
