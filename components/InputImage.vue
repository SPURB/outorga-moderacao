<template>
  <div class="file-image">
    <div class="file-image__input">
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
    </div>

    <div v-if="previews.length > 0" class="file-image__galeria">
      <div
        class="preview"
        :key="index"
        v-for="(imagem, index) in previews"
        :style="{
          'background-image': `url(${imagem.preview})`,
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          width: '200px',
          height: '125px',
          margin: '5px'
        }"
      >
        <div class="remove" @click="removeElement(index)">
          X
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputImage',
  data () {
    return {
      previews: []
    }
  },
  methods: {
    setFile (event) {
      const files = event.target.files

      for (const file of files) {
        this.previews.push({
          arquivo: file,
          preview: URL.createObjectURL(file)
        })
      }
    },
    removeElement (el) {
      console.log(el)
      this.previews = this.previews.filter((value, index) => index != el)
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

  &__input {
    align-items: center;
    display: flex;
    width: 50%;

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

    .preview {
      display: flex;
      justify-content: flex-end;
      padding-top: 5px;
      padding-right: 5px;

      .remove {
        background-color: #eb5757;
        cursor: pointer;
        color: #fff;
        display: flex;
        justify-content: center;
        font-weight: bold;
        border-radius: 100%;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
