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
      <Imagem
        :key="index"
        :arquivo="arquivo"
        :index="index"
        v-for="(arquivo, index) in arquivos"
        @uploadedImage="mudarStatus"
        @remove="removeImage"
      />
    </div>
  </div>
</template>

<script>
import { formApi, axiosArquivos } from '~/plugins/axios'
import Imagem from '~/components/forms/Imagem'
export default {
  name: 'InputImage',
  components: { Imagem },
  data () {
    return {
      arquivos: []
    }
  },
  beforeMount () {
    this.getFila()
  },
  methods: {
    setFile (event) {
      Array.from(event.target.files).forEach((file, index) => {
        this.arquivos.push({
          file: file,
          isApi: false,
          props: {
            IdArquivo: index,
            IdFilaCepac: this.$route.params.id,
            id: 0
          },
          preview: URL.createObjectURL(file)
        })
      })
    },
    mudarStatus ({ IdArquivo, id, indice }) {
      let arquivo = this.arquivos.filter((val, index) => index === indice)
      arquivo[0].isApi = true
      arquivo[0].props.IdArquivo = IdArquivo
      arquivo[0].props.id = id
      this.$set(this.arquivos, indice, arquivo[0])
    },
    async getFila () {
      let arquivosFila = []
      await formApi
        .get(`/arquivofila?IdFilaCepac=${this.$route.params.id}`)
        .then(res => {
          arquivosFila = res.data.map(v => {
            return { url: `/arquivos/api/${v.IdArquivo}`, id: v.Id }
          })
        })
        .catch(err => console.log(err))

      for (const item of arquivosFila) {
        await axiosArquivos
          .get(item.url)
          .then(res => {
            this.arquivos.push({
              file: res.data.file.filename,
              isApi: true,
              props: {
                IdArquivo: res.data._id,
                IdFilaCepac: this.$route.params.id,
                id: item.id
              },
              preview: `https://servicos.spurbanismo.sp.gov.br/public/${res.data.file.filename}`
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    removeImage (value) {
      this.arquivos = this.arquivos.filter((val, index) => index !== value)
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
  }
}
</style>
