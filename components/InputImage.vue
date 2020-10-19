<template>
  <div class="file-image">
    <div class="file-image__groupInput">
      <section class="file-image__input">
        <label>
          inserir imagens
        </label>
        <input
          id="fileImage"
          type="file"
          multiple
          name="file"
          class="inputfile inputfile--imagem"
          accept="image/png, image/jpeg, image/jpg"
          @change="setFile"
        />
        <label for="fileImage">
          fazer upload do computador...
        </label>
      </section>
    </div>

    <div v-if="arquivos.length > 0" class="file-image__galeria">
      <div
        :class="arquivo.isApi ? '' : 'preview__newImage'"
        :key="index"
        :style="{
          'background-image': `url(${arquivo.preview})`,
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        }"
        class="preview"
        v-for="(arquivo, index) in arquivos"
      >
        <div class="remove" @click.prevent="removeElement(index)">
          X
        </div>

        <div class="salvar" @click.prevent="enviarFoto(index)">
          ENVIAR
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosArquivos } from '~/plugins/axios'
export default {
  name: 'InputImage',
  data () {
    return {
      arquivos: []
    }
  },
  methods: {
    setFile (event) {
      const files = event.target.files

      for (const file of files) {
        this.arquivos.push({
          file: file,
          isApi: false,
          preview: URL.createObjectURL(file)
        })
      }
    },
    // getFila () {},
    removeElement (el) {
      const arquivo = this.arquivos.filter((value, index) => index === el)
      if (arquivo.isApi) {
        console.log('REMOVENDO NA API')
      } else {
        this.arquivos = this.arquivos.filter((value, index) => index !== el)
        console.log('REMOVENDO DO ARRAY')
      }
    },
    async enviarFoto (el) {
      let fd = new FormData()
      const arquivo = this.arquivos.filter((value, index) => index === el)
      fd.append('arquivo', arquivo[0].file)

      await axiosArquivos
        .post('/', fd, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=something'
          }
        })
        .then(res => {
          // aqui vai colocar o registro na api do outorga
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-image {
  width: 100%;
  background-color: #008375;
  padding: 30px;
  display: flex;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  &__groupInput {
    display: flex;
    flex-direction: column;
    width: 50%;

    @media screen and (max-width: 800px) {
      width: 100%;
      align-items: flex-start;
      flex-direction: column;
    }

    .inputfile {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;

      &--imagem {
        & + label {
          background-color: #005249;
          color: rgba(255, 255, 255, 0.5);
          padding: 7px 15px;
          border-radius: 5px;
          display: inline-block;
          cursor: pointer;

          @media screen and (max-width: 800px) {
            width: 100%;
          }
        }
      }
    }

    label {
      color: #fff;
      font-size: 11pt;
      text-transform: uppercase;
      margin-right: 5px;
    }
  }

  &__galeria {
    display: flex;
    flex-wrap: wrap;
    width: 50%;

    @media screen and (max-width: 800px) {
      width: 100%;
    }

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
  }
}
</style>
